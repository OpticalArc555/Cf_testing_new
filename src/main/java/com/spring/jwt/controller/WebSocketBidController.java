package com.spring.jwt.controller;

import com.spring.jwt.Interfaces.BeadingCarService;
import com.spring.jwt.Interfaces.BidCarsService;
import com.spring.jwt.Interfaces.PlacedBidService;
import com.spring.jwt.dto.BeedingDtos.PlacedBidDTO;
import com.spring.jwt.dto.BidCarsDTO;
import com.spring.jwt.dto.ResponseDto;
import com.spring.jwt.exception.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


@Controller
@RequiredArgsConstructor
public class WebSocketBidController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketBidController.class);
    private final PlacedBidService placedBidService;
    private final SimpMessagingTemplate messagingTemplate;
    private final BeadingCarService beadingCarService;

    @PreAuthorize("permitAll")
    @MessageMapping("/placeBid")
    @SendTo("/topic/bids")
    public ResponseDto placeBid(PlacedBidDTO placedBidDTO) {
        try {
            logger.info("Received bid: {}", placedBidDTO);
            String result = placedBidService.placeBid(placedBidDTO, placedBidDTO.getBidCarId());

            messagingTemplate.convertAndSend("/topic/bids", placedBidDTO);
            return new ResponseDto("success", result);
        } catch (BidAmountLessException | UserNotFoundExceptions | BidForSelfAuctionException |
        InsufficientBalanceException e) {
            logger.error("Error placing bid: {}", e.getMessage());
            return new ResponseDto("error", e.getMessage());
        }
    }

    @PreAuthorize("permitAll")
    @MessageMapping("/topThreeBids")
    @SendTo("/topic/topThreeBids")
    public List<PlacedBidDTO> getTopThreeBids(PlacedBidDTO placedBidDTO) {
        try {
            if (placedBidDTO.getBidCarId() == null) {
                throw new IllegalArgumentException("Bid car ID must not be null");
            }
            return placedBidService.getTopThree(placedBidDTO.getBidCarId());
        } catch (IllegalArgumentException e) {
            logger.error("Invalid request for top three bids: {}", e.getMessage());
            return Collections.emptyList();
        } catch (BidNotFoundExceptions e) {
            logger.error("Error finding top three bids: {}", e.getMessage());
            return Collections.emptyList();
        }
    }


    @MessageMapping("/topBid")
    @SendTo("/topic/topBid")
    public PlacedBidDTO getTopBid(PlacedBidDTO placedBidDTO) {
        try {
            return placedBidService.getTopBid(placedBidDTO.getBidCarId());
        } catch (BidNotFoundExceptions e) {
            logger.error("Error finding top bid: {}", e.getMessage());
            return null;
        }
    }

    @MessageMapping("/topBids/{bidCarId}")
    @SendTo("/topic/topBids")
    public PlacedBidDTO getTopBid(@DestinationVariable Integer bidCarId) {
        try {
            return placedBidService.getTopBid(bidCarId);
        } catch (BidNotFoundExceptions e) {
            logger.error("Error finding top bids: {}", e.getMessage());
            return null;
        }
    }
    @PreAuthorize("permitAll")
    @MessageMapping("/liveCars")
    @SendTo("/topic/liveCars")
    public List<BidCarsDTO> getAllLiveCars() {
        try {
            LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
            List<BidCarsDTO> liveCars = beadingCarService.getAllLiveCars();
            return liveCars;
        } catch (Exception e) {
            logger.error("Error getting live cars: {}", e.getMessage());
            return Collections.emptyList();
        }
    }


}
