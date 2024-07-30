package com.spring.jwt.service;

import com.spring.jwt.Interfaces.BidCarsService;
import com.spring.jwt.dto.BeadingCAR.BeadingCARDto;
import com.spring.jwt.dto.BidCarsDTO;
import com.spring.jwt.dto.BidDetailsDTO;
import com.spring.jwt.dto.ResDtos;
import com.spring.jwt.entity.*;
import com.spring.jwt.exception.BeadingCarNotFoundException;
import com.spring.jwt.exception.UserNotFoundExceptions;
import com.spring.jwt.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ScheduledFuture;

@Service
@RequiredArgsConstructor
public class BidCarsServiceImpl implements BidCarsService {

    private final ModelMapper modelMapper;

    private final BeadingCarRepo beadingCarRepo;

    private final BidCarsRepo bidCarsRepo;

    private final PlacedBidRepo placedBidRepo;

    private final FinalBidRepository finalBidRepo;

    private final UserRepository userRepository;

    private final ThreadPoolTaskScheduler taskScheduler;

    private ScheduledFuture<?> scheduledFuture;

    @Override
    public BidCarsDTO createBidding(BidCarsDTO bidCarsDTO) {
        User byUserId = userRepository.findByUserId(bidCarsDTO.getUserId());
        Optional<BidCars> biddingCar = bidCarsRepo.findByBeadingCarId(bidCarsDTO.getBeadingCarId());

        if (biddingCar.isPresent()) {
            throw new RuntimeException("Car Already Added for the Bidding");
        }
        if (byUserId == null) {
            throw new UserNotFoundExceptions("User not found");
        }
        Set<Role> roles = byUserId.getRoles();
        boolean isSalesPerson = roles.stream().anyMatch(role -> "SALESPERSON".equals(role.getName()));
        if (!isSalesPerson) {
            throw new RuntimeException("You're not authorized to perform this action");
        }
        Optional<BeadingCAR> byId = beadingCarRepo.findById(bidCarsDTO.getBeadingCarId());
        if (byId.isEmpty()) {
            throw new RuntimeException("Car Not Found");
        }

        BeadingCAR beadingCAR = byId.get();
        String carStatus = beadingCAR.getCarStatus();
        if (!"ACTIVE".equals(carStatus)) {
            throw new RuntimeException("Car is not Verified by SalesInspector, it can't be bid on.");
        }

        BidCars bidCars = convertToEntity(bidCarsDTO);
        BidCars savedBid = bidCarsRepo.save(bidCars);

        // Schedule task for the closing time
        scheduleBidProcessing(savedBid);

        return convertToDto(savedBid);
    }

    private void scheduleBidProcessing(BidCars bidCar) {
        LocalDateTime closingTime = bidCar.getClosingTime();
        long delay = java.time.Duration.between(LocalDateTime.now(), closingTime).toMillis();

        if (delay > 0) {
            // Cancel the previous task if needed
            if (scheduledFuture != null && !scheduledFuture.isDone()) {
                scheduledFuture.cancel(false);
            }

            // Schedule new task
            scheduledFuture = taskScheduler.schedule(() -> processBid(bidCar), new Date(System.currentTimeMillis() + delay));
        }
    }

    public void processBid(BidCars bidCar) {
        // Implement bid processing logic here
        List<PlacedBid> highestBids = placedBidRepo.findTopBidByBidCarId(bidCar.getBidCarId(), PageRequest.of(0, 1));
        if (!highestBids.isEmpty()) {
            PlacedBid bid = highestBids.get(0);
            FinalBid finalBid = new FinalBid();
            finalBid.setSellerDealerId(bidCar.getUserId());
            finalBid.setBuyerDealerId(bid.getUserId());
            finalBid.setBidCarId(bidCar.getBidCarId());
            finalBid.setPrice(bid.getAmount());

            finalBidRepo.save(finalBid);
        }
    }
    @Override
    public BidDetailsDTO getbyBidId(Integer bidCarId, Integer beadingCarId) {
        Optional<BidCars> bidCarOptional  = bidCarsRepo.findById(bidCarId);
        Optional<BeadingCAR> beadingCarOptional  = beadingCarRepo.findById(beadingCarId);

        if (bidCarOptional.isPresent() && beadingCarOptional.isPresent()) {
            BidCars bidCar = bidCarOptional.get();
            BeadingCAR beadingCar = beadingCarOptional.get();

            BidDetailsDTO bidDetailsDTO = new BidDetailsDTO();

            bidDetailsDTO.setBidCarId(bidCar.getBidCarId());
            bidDetailsDTO.setBeadingCarId(beadingCar.getBeadingCarId());
            bidDetailsDTO.setClosingTime(bidCar.getClosingTime());
            bidDetailsDTO.setCreatedAt(bidCar.getCreatedAt());

            // Set additional features from BeadingCAR
            bidDetailsDTO.setMusicFeature(beadingCar.getMusicFeature());
            bidDetailsDTO.setArea(beadingCar.getArea());
            bidDetailsDTO.setBrand(beadingCar.getBrand());
            bidDetailsDTO.setCarInsurance(beadingCar.getCarInsurance());
            bidDetailsDTO.setCarStatus(beadingCar.getCarStatus());
            bidDetailsDTO.setCity(beadingCar.getCity());
            bidDetailsDTO.setColor(beadingCar.getColor());
            bidDetailsDTO.setDescription(beadingCar.getDescription());
            bidDetailsDTO.setFuelType(beadingCar.getFuelType());
            bidDetailsDTO.setKmDriven(beadingCar.getKmDriven());
            bidDetailsDTO.setModel(beadingCar.getModel());
            bidDetailsDTO.setOwnerSerial(beadingCar.getOwnerSerial());
            bidDetailsDTO.setPowerWindowFeature(beadingCar.getPowerWindowFeature());
            bidDetailsDTO.setPrice(beadingCar.getPrice());
            bidDetailsDTO.setRearParkingCameraFeature(beadingCar.getRearParkingCameraFeature());
            bidDetailsDTO.setRegistration(beadingCar.getRegistration());
            bidDetailsDTO.setTransmission(beadingCar.getTransmission());
            bidDetailsDTO.setYear(beadingCar.getYear());
            bidDetailsDTO.setDate(beadingCar.getDate());
            bidDetailsDTO.setUserId(beadingCar.getUserId());
            bidDetailsDTO.setVariant(beadingCar.getVariant());
            bidDetailsDTO.setTitle(beadingCar.getTitle());
            bidDetailsDTO.setDealer_id(beadingCar.getDealerId());

            // Set new fields
            bidDetailsDTO.setAutomaticEmergencyBraking(beadingCar.getAutomaticEmergencyBraking());
            bidDetailsDTO.setADAS(beadingCar.getADAS());
            bidDetailsDTO.setSunroof(beadingCar.getSunroof());
            bidDetailsDTO.setParkingSensors(beadingCar.getParkingSensors());
            bidDetailsDTO.setAdaptiveHeadlights(beadingCar.getAdaptiveHeadlights());
            bidDetailsDTO.setChildSafetyLocks(beadingCar.getChildSafetyLocks());

            return bidDetailsDTO;
        } else {
            throw new RuntimeException("Bid car or Beading car not found");
        }
    }

//    public BidDetailsDTO getbyBidId(Integer bidCarId, Integer beadingCarId) {
//        Optional<BidCars> bidCarOptional  = bidCarsRepo.findById(bidCarId);
//        Optional<BeadingCAR> beadingCarOptional  = beadingCarRepo.findById(beadingCarId);
//
//        if (bidCarOptional.isPresent() && beadingCarOptional.isPresent()) {
//            BidCars bidCar = bidCarOptional.get();
//            BeadingCAR beadingCar = beadingCarOptional.get();
//
//            BidDetailsDTO bidDetailsDTO = new BidDetailsDTO();
//
//            bidDetailsDTO.setBidCarId(bidCar.getBidCarId());
//            bidDetailsDTO.setBeadingCarId(beadingCar.getBeadingCarId());
//            bidDetailsDTO.setClosingTime(bidCar.getClosingTime());
//            bidDetailsDTO.setCreatedAt(bidCar.getCreatedAt());
//            bidDetailsDTO.setMusicFeature(beadingCar.getMusicFeature());
//            bidDetailsDTO.setArea(beadingCar.getArea());
//            bidDetailsDTO.setBrand(beadingCar.getBrand());
//            bidDetailsDTO.setCarInsurance(beadingCar.getCarInsurance());
//            bidDetailsDTO.setCarStatus(beadingCar.getCarStatus());
//            bidDetailsDTO.setCity(beadingCar.getCity());
//            bidDetailsDTO.setColor(beadingCar.getColor());
//            bidDetailsDTO.setDescription(beadingCar.getDescription());
//            bidDetailsDTO.setFuelType(beadingCar.getFuelType());
//            bidDetailsDTO.setKmDriven(beadingCar.getKmDriven());
//            bidDetailsDTO.setModel(beadingCar.getModel());
//            bidDetailsDTO.setOwnerSerial(beadingCar.getOwnerSerial());
//            bidDetailsDTO.setPowerWindowFeature(beadingCar.getPowerWindowFeature());
//            bidDetailsDTO.setPrice(beadingCar.getPrice());
//            bidDetailsDTO.setRearParkingCameraFeature(beadingCar.getRearParkingCameraFeature());
//            bidDetailsDTO.setRegistration(beadingCar.getRegistration());
//            bidDetailsDTO.setTransmission(beadingCar.getTransmission());
//            bidDetailsDTO.setYear(beadingCar.getYear());
//            bidDetailsDTO.setDate(beadingCar.getDate());
//            bidDetailsDTO.setUserId(beadingCar.getUserId());
//            bidDetailsDTO.setVariant(beadingCar.getVariant());
//            bidDetailsDTO.setTitle(beadingCar.getTitle());
//            bidDetailsDTO.setDealer_id(beadingCar.getDealerId());
//
//            return bidDetailsDTO;
//        }else {
//            throw new RuntimeException("Bid car or Beading car not found");
//        }
//    }

    @Override
    public List<BidCarsDTO> getByUserId(Integer userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new UserNotFoundExceptions("User with ID: " + userId + " not found", HttpStatus.NOT_FOUND);
        }

        List<BeadingCAR> beadingCars = beadingCarRepo.findByUserId(userId);
        if (beadingCars.isEmpty()) {
            throw new BeadingCarNotFoundException("No Beading cars found for user with ID: " + userId, HttpStatus.NOT_FOUND);
        }

        List<BidCarsDTO> dtos = new ArrayList<>();
        for (BeadingCAR beadingCAR : beadingCars) {
            dtos.add(new BidCarsDTO(beadingCAR));
        }
        return dtos;
    }

    @Override
    public BidCarsDTO getbyBidId(Integer beadingCarId) {
        Optional<BidCars> byBeadingCarId = bidCarsRepo.findByBeadingCarId(beadingCarId);
        if(byBeadingCarId.isPresent()) {
            BidCars bidCars = byBeadingCarId.get();
            BidCarsDTO carsDTO = convertToDto(bidCars);
            return carsDTO;
        }else{
            throw new RuntimeException("Car Not Found");
        }
    }


    public BidCars convertToEntity(BidCarsDTO bidCarsDTO){
        BidCars bdCarEntity = modelMapper.map(bidCarsDTO, BidCars.class);
        return bdCarEntity;
    }

    public BidCarsDTO convertToDto (BidCars bidCars){
        BidCarsDTO bdCarDto = modelMapper.map(bidCars, BidCarsDTO.class);
        return bdCarDto;
    }
}
