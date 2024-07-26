package com.spring.jwt.Interfaces;

import com.spring.jwt.dto.BeedingDtos.PlacedBidDTO;
import com.spring.jwt.entity.FinalBid;
import com.spring.jwt.entity.PlacedBid;
import com.spring.jwt.exception.BidAmountLessException;
import com.spring.jwt.exception.BidForSelfAuctionException;

import java.util.List;

public interface PlacedBidService {
    public String placeBid(PlacedBidDTO placedBidDTO, Integer bidCarId) throws BidAmountLessException, BidForSelfAuctionException;

    public List<PlacedBidDTO> getByUserId(Integer userId);

//    void processClosedAuctions();

    public  List<PlacedBidDTO> getByCarID(Integer bidCarId );

    public PlacedBidDTO getById(Integer placedBidId);

    List<FinalBid> getAllFinalBids();

    public  List<PlacedBidDTO> getTopThree(Integer bidCarId);

    PlacedBidDTO getTopBid(Integer bidCarId);
}
