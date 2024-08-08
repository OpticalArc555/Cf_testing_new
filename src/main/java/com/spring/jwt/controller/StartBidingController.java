package com.spring.jwt.controller;

import com.spring.jwt.Bidding.Interface.SmsService;
import com.spring.jwt.Interfaces.BeadingCarService;
import com.spring.jwt.Interfaces.BidCarsService;
import com.spring.jwt.Interfaces.BiddingTimerService;
import com.spring.jwt.dto.*;
import com.spring.jwt.entity.BeadingCAR;
import com.spring.jwt.entity.BidCars;
import com.spring.jwt.entity.BiddingTimerRequest;
import com.spring.jwt.entity.User;
import com.spring.jwt.exception.BeadingCarNotFoundException;
import com.spring.jwt.exception.UserNotFoundExceptions;
import com.spring.jwt.repository.BeadingCarRepo;
import com.spring.jwt.repository.BidCarsRepo;
import com.spring.jwt.repository.BiddingTImerRepo;
import com.spring.jwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.*;

import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/Bidding/v1")
@RequiredArgsConstructor
public class StartBidingController {

    private final BidCarsRepo bidCarsRepo;
    private final BiddingTimerService biddingTimerService;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final BeadingCarService beadingCarService;
    private final BidCarsService bidCarsService;
    private final BeadingCarRepo beadingCarRepo;
    private final SmsService smsService;

    private final BiddingTImerRepo biddingTImerRepo;

    private final Logger logger = LoggerFactory.getLogger(StartBidingController.class);

    private final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(10);

    private final ConcurrentHashMap<Integer, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();

    private final ConcurrentHashMap<Integer, BiddingTimerRequestDTO> biddingTimerRequests = new ConcurrentHashMap<>();

    @PostMapping("/SetTime")
    public ResponseEntity<?> setTimer(@RequestBody BiddingTimerRequestDTO biddingTimerRequest) {
        Optional<User> user = userRepository.findById(biddingTimerRequest.getUserId());
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
        }
        if (biddingTImerRepo.existsByBeadingCarId(biddingTimerRequest.getBeadingCarId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Bid timing already set for the car, please update if required");
        }
        try {
            LocalDateTime endTime = biddingTimerRequest.getEndTime();
            // Log the end time
            System.out.println("Received end time: " + endTime);

            // Optionally convert to UTC or any specific time zone for storage
            ZonedDateTime endTimeZoned = endTime.atZone(ZoneId.of("Asia/Kolkata"));
            System.out.println("End time in Asia/Kolkata: " + endTimeZoned);

            BiddingTimerRequestDTO savedRequest = biddingTimerService.startTimer(biddingTimerRequest);
            biddingTimerRequests.put(savedRequest.getBiddingTimerId(), savedRequest);
            scheduleTask(savedRequest.getBiddingTimerId(), endTime);
            return ResponseEntity.status(HttpStatus.OK).body(new ResDtos("success", savedRequest));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    private void scheduleTask(int biddingTimerId, LocalDateTime endTime) {
        long delay = calculateDelayInMillis(endTime);
        System.err.println("Task scheduled to send mail and add car at: " + endTime);

        ScheduledFuture<?> scheduledTask = executorService.schedule(() -> {
            if (LocalDateTime.now().isBefore(endTime)) {
                try {
                    Thread.sleep(java.time.Duration.between(LocalDateTime.now(), endTime).toMillis());
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            createBiddingOnTimerEnd(biddingTimerId);
            CompletableFuture.runAsync(this::pushNotificationToAllUsers);
        }, delay, TimeUnit.MILLISECONDS);
        scheduledTasks.put(biddingTimerId, scheduledTask);
    }

    private long calculateDelayInMillis(LocalDateTime endTime) {
        LocalDateTime now = LocalDateTime.now();
        return java.time.Duration.between(now, endTime).toMillis();
    }

    private void createBiddingOnTimerEnd(int biddingTimerId) {
        BiddingTimerRequestDTO biddingTimerRequest = biddingTimerRequests.get(biddingTimerId);
        if (biddingTimerRequest == null) {
            logger.error("BiddingTimerRequest not found for BiddingTimerId: " + biddingTimerId);
            return;
        }
        Optional<BeadingCAR> beadingCarOpt = beadingCarRepo.findById(biddingTimerRequest.getBeadingCarId());
        if (!beadingCarOpt.isPresent()) {
            logger.error("BeadingCAR not found for BeadingCarId: " + biddingTimerRequest.getBeadingCarId());
            return;
        }
        BeadingCAR beadingCar = beadingCarOpt.get();
        BidCarsDTO bidCarsDTO = new BidCarsDTO();
        bidCarsDTO.setBeadingCarId(beadingCar.getBeadingCarId());
        bidCarsDTO.setCreatedAt(LocalDateTime.now());
        bidCarsDTO.setBasePrice(biddingTimerRequest.getBasePrice());
        bidCarsDTO.setUserId(biddingTimerRequest.getUserId());
        ResponseEntity<?> response = createBidding(bidCarsDTO);
        if (response.getStatusCode() == HttpStatus.OK) {
            logger.info("Bidding created successfully after timer ended for BiddingTimerId: " + biddingTimerId);
        } else {
            logger.error("Failed to create bidding after timer ended for BiddingTimerId: " + biddingTimerId);
        }
        publishLiveCarsToWebSocket();
    }

    private void publishLiveCarsToWebSocket() {
        List<BidCarsDTO> liveCars = beadingCarService.getAllLiveCars();
        logger.info("Publishing live cars to WebSocket: " + liveCars);
        messagingTemplate.convertAndSend("/topic/liveCars", liveCars);
    }

    private void pushNotificationToAllUsers() {
        List<User> allUsers = userRepository.findAll();
        List<String> dealerEmails = allUsers.stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getName().equals("DEALER")))
                .map(User::getEmail)
                .collect(Collectors.toList());
        List<String> dealerMobileNumbers = allUsers.stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getName().equals("DEALER")))
                .map(User::getMobileNo)
                .collect(Collectors.toList());
        try {
            sendNotification(dealerEmails, "Hurry Up Bidding is Started!");
            logger.info("Notification sent to users: " + dealerEmails);
        } catch (Exception e) {
            logger.error("Failed to send notification to users: " + dealerEmails, e);
        }
    }

    private void sendNotification(List<String> recipients, String message) {
        biddingTimerService.sendBulkEmails(recipients, message);
    }

    @PostMapping("/CreateBidding")
    public ResponseEntity<?> createBidding(@RequestBody BidCarsDTO bidCarsDTO) {
        try {
            BidCarsDTO bidding = bidCarsService.createBidding(bidCarsDTO);
            return ResponseEntity.status(HttpStatus.OK).body(new ResDtos("success", bidding));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    private ResponseEntity<ResponseSingleCarDto> handleException(Exception e) {
        ResponseSingleCarDto responseSingleCarDto = new ResponseSingleCarDto("unsuccess");
        responseSingleCarDto.setException(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseSingleCarDto);
    }

    @PostMapping("/UpdateBiddingTime")
    public ResponseEntity<?> updateBiddingTime(@RequestBody BiddingTimerRequestDTO updateBiddingTimeRequest) {
        try {
            BiddingTimerRequest existingRequest = biddingTImerRepo.findByBeadingCarId(updateBiddingTimeRequest.getBeadingCarId());

            LocalDateTime endTime = existingRequest.getEndTime();
            if (endTime.isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("End time has already passed");
            }

            BiddingTimerRequestDTO updatedTimerRequest = biddingTimerService.updateBiddingTime(updateBiddingTimeRequest);
            if (updatedTimerRequest.getBiddingTimerId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BiddingTimerId is null or not properly set");
            }

            cancelExistingTask(updatedTimerRequest.getBiddingTimerId());

            System.err.println("Updated the Task & rescheduled to send mail and add car at: " + updateBiddingTimeRequest.getEndTime());

            scheduleTask(updatedTimerRequest.getBiddingTimerId(), updateBiddingTimeRequest.getEndTime());
            return ResponseEntity.status(HttpStatus.OK).body(new ResDtos("success", updatedTimerRequest));
        } catch (UserNotFoundExceptions | BeadingCarNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseSingleCarDto("User or car not found"));
        } catch (Exception e) {
            return handleException(e);
        }
    }

    private void cancelExistingTask(int biddingTimerId) {
        ScheduledFuture<?> existingTask = scheduledTasks.get(biddingTimerId);
        if (existingTask != null && !existingTask.isDone()) {
            existingTask.cancel(true);
            scheduledTasks.remove(biddingTimerId);
        }
    }

    @GetMapping("/getById")
    public ResponseEntity<?> getbiddingcar(@RequestParam Integer bidCarId, @RequestParam Integer beadingCarId) {
        BidDetailsDTO bidDetailsDTO = bidCarsService.getbyBidId(bidCarId, beadingCarId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResDtos("Success", bidDetailsDTO));
    }

    @GetMapping("/getByBidCarId")
    public ResponseEntity<?> getbiddingcar(@RequestParam Integer beadingCarId) {
        try {
            BidCarsDTO bidDetailsDTO = bidCarsService.getbyBidId(beadingCarId);
            return ResponseEntity.status(HttpStatus.OK).body(new ResDtos("Success", bidDetailsDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResDtos("Unsuccess", e.getMessage()));
        }
    }

    @GetMapping("/beadCarByUserId")
    public ResponseEntity<ResponseAllBidCarsDTO> getByUserId(@RequestParam Integer userId) {
        ResponseAllBidCarsDTO response = new ResponseAllBidCarsDTO("success");
        try {
            List<BidCarsDTO> bidCarsDTOs = bidCarsService.getByUserId(userId);
            response.setBookings(bidCarsDTOs);
            return ResponseEntity.ok(response);
        } catch (UserNotFoundExceptions ex) {
            response.setStatus("error");
            response.setMessage(ex.getMessage());
            response.setException(ex.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (BeadingCarNotFoundException ex) {
            response.setStatus("error");
            response.setMessage(ex.getMessage());
            response.setException(ex.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping ("/Timing")
    public BidCarsDTO getTiming (@RequestParam Integer bidCarId) {
        Optional<BidCars> time = bidCarsRepo.findById(bidCarId);
        BidCarsDTO carsDTO = new BidCarsDTO();
        carsDTO.setCreatedAt(time.get().getCreatedAt());
        return carsDTO;
    }
}
