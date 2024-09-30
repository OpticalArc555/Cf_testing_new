package com.spring.jwt.B2B;


import com.spring.jwt.entity.*;

import com.spring.jwt.exception.UserNotFoundExceptions;

import com.spring.jwt.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class B2BServiceImpl implements B2BService {

    private final B2BRepo b2BRepo;

    private final CarRepo carRepo;

    private final UserRepository userRepository;

    private final UserProfileRepository userProfileRepository;

    private final BeadingCarRepo beadingCarRepo;


    @Override
    public String addB2B(B2BDto b2BDto) {

        if (b2BDto.getRequestStatus() != Status.ACTIVE &&
                b2BDto.getRequestStatus() != Status.DEACTIVATE &&
                b2BDto.getRequestStatus() != Status.SOLD) {
            throw new IllegalArgumentException("Invalid status: " + b2BDto.getRequestStatus());
        }

        Optional<Car> byId = carRepo.findById(b2BDto.getBeadingCarId());
        if (byId.isEmpty()) {
            throw new RuntimeException("Car Not Found By Id");
        }

        User byUserId = userRepository.findByUserId(b2BDto.getBuyerDealerId());
        if (byUserId == null) {
            throw new UserNotFoundExceptions("User Not Found");
        }

        B2B b2B = new B2B(b2BDto);
        b2BRepo.save(b2B);
        return "Request For CarID:" + b2B.getBeadingCarId() + "Submitted Successfully";
    }


    @Override
    public Dealer getDealerByCarId(Integer beadingCarId) {
        Optional<BeadingCAR> byId = beadingCarRepo.findById(beadingCarId);
        if (byId.isEmpty()) {
            throw new RuntimeException("Car not found with ID: " + beadingCarId);
        }

        BeadingCAR beadingCAR = byId.get();
        Integer dealerId = beadingCAR.getDealerId();
        if (dealerId == null) {
            throw new RuntimeException("Dealer not found for the car with ID: " + byId);
        }
        Dealer dealer = userRepository.findDealerById(dealerId);
        if (dealer == null) {
            throw new RuntimeException("Dealer not found with ID: " + dealerId);
        }

        return dealer;
    }

    @Override
    public UserInfoDto getUserInfoFromDealerId(Integer dealerId) {
        User user = userRepository.findUserByDealerId(dealerId)
                .orElseThrow(() -> new RuntimeException("User not found for dealerId: " + dealerId));

        Userprofile userProfile = userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("UserProfile not found for userId: " + user.getId()));

        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setUserId(user.getId());
        userInfoDto.setEmail(user.getEmail());
        userInfoDto.setMobileNo(user.getMobileNo());
        userInfoDto.setFirstName(userProfile.getFirstName());
        userInfoDto.setLastName(userProfile.getLastName());
        userInfoDto.setAddress(userProfile.getAddress());

        return userInfoDto;
    }

    @Override
    public B2B getB2BById(Integer id) {
        return b2BRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("B2B record not found with ID: " + id));
    }

    @Override
    public List<B2B> getAllB2BRecords() {
        return b2BRepo.findAll();
    }


    @Override
    public void deleteB2B(Integer id) {
        B2B b2B = b2BRepo.findById(id).orElseThrow(() -> new B2BNotFoundExceptions("B2B with ID " + id + " not found"));
        b2B.setDeleted(true);
        b2BRepo.save(b2B);

    }

    @Override
    public int getB2BCountByStatusAndDealer(Status requestStatus, int dealerId) {
        return b2BRepo.countByRequestStatusAndBuyerDealerId(requestStatus, dealerId);
    }



    @Override
    public B2B updateB2B(Integer id) {
        B2B existingB2B = b2BRepo.findById(id)
                .orElseThrow(() -> new B2BNotFoundExceptions("B2B with ID " + id + " not found"));

        if (existingB2B.getRequestStatus() != Status.ACTIVE) {
            throw new RuntimeException("car Not Found");
        }
        List<B2B> allRequests = b2BRepo.findAll();
        for (B2B b2B : allRequests) {
            if (b2B.getId() != id && b2B.getRequestStatus() != Status.SOLD) {
                b2B.setRequestStatus(Status.DEACTIVATE);
                b2BRepo.save(b2B);
            }
        }
        existingB2B.setRequestStatus(Status.SOLD);

        return b2BRepo.save(existingB2B);
    }


    public void cancelSoldRequest(Integer id) {
        B2B soldRequest = b2BRepo.findById(id)
                .orElseThrow(() -> new B2BNotFoundExceptions("Sold request with ID " + id + " not found"));

        if (soldRequest.getRequestStatus() == Status.ACTIVE) {
            throw new B2BNotFoundExceptions("This car is already active and cannot be canceled.");
        }

        if (soldRequest.getRequestStatus() == Status.SOLD) {

            soldRequest.setRequestStatus(Status.DEACTIVATE);
            b2BRepo.save(soldRequest);

            List<B2B> allRequests = b2BRepo.findAll();
            for (B2B b2B : allRequests) {
                if (b2B.getRequestStatus() == Status.DEACTIVATE) {
                    b2B.setRequestStatus(Status.ACTIVE);
                    b2BRepo.save(b2B);
                }
            }
        }
    }

    @Override
    public List<B2BDto> getAllDeactivateRequests() {
        List<B2B> deactivatedRequests = b2BRepo.findByRequestStatus(Status.DEACTIVATE);
        if (deactivatedRequests.isEmpty()) {
            throw new B2BNotFoundExceptions("No deactivated requests found");
        }
        return deactivatedRequests.stream()
                .map(B2BDto::new)
                .collect(Collectors.toList());
    }


}
