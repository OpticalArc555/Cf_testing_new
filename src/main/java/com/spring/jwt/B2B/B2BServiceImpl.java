package com.spring.jwt.B2B;


import com.spring.jwt.entity.*;

import com.spring.jwt.exception.UserNotFoundExceptions;

import com.spring.jwt.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class B2BServiceImpl implements B2BService {

    private final B2BRepo b2BRepo;
    private final BeadingCarRepo beadingCarRepo;
    private final DealerRepository dealerRepository;

    @Override
    @Transactional
    public String addB2B(B2BPostDto b2BPostDto) {
        try {
            B2B b2B = new B2B();

            b2B.setBeadingCarId(b2BPostDto.getBeadingCarId());
            b2B.setBuyerDealerId(b2BPostDto.getBuyerDealerId());
            b2B.setTime(b2BPostDto.getTime().atStartOfDay());

            b2B.setRequestStatus(Status.PENDING);

            BeadingCAR beadingCar = beadingCarRepo.findById(b2BPostDto.getBeadingCarId())
                    .orElseThrow(() -> new RuntimeException("BeadingCar not found with id: " + b2BPostDto.getBeadingCarId()));

            if (!beadingCar.getCarStatus().equals(Status.ACTIVE)) {
                throw new RuntimeException("Car is not active.");
            }
            b2B.setSellerDealerId(beadingCar.getDealerId());
            b2B.setSalesPersonId(null);
            b2BRepo.save(b2B);

            return "B2B transaction added successfully.";
        } catch (RuntimeException e) {
            throw new RuntimeException("Error while adding B2B transaction: " + e.getMessage());
        }
    }



    @Override
    public List<B2BDto> getByBeadingCarId(Status requestStatus, Integer beadingCarId) {
        List<B2B> b2bList = b2BRepo.findByRequestStatusAndBeadingCarId(requestStatus, beadingCarId);

        if (b2bList.isEmpty()) {
            throw new RuntimeException("No B2B transactions found for BeadingCarId: " + beadingCarId + " with status: " + requestStatus);
        }

        return b2bList.stream().map(this::mapToB2BDto).collect(Collectors.toList());
    }

    @Override
    public B2BDto getByB2bId(Integer b2BId) {
        B2B b2b = b2BRepo.findById(b2BId).orElseThrow(() -> new RuntimeException("B2B not found with id: " + b2BId));
        return mapToB2BDto(b2b);
    }


    @Override
    public int getB2BCountByStatusAndDealer(Status requestStatus, Integer sellerDealerId) {
        return b2BRepo.countByRequestStatusAndSellerDealerId(requestStatus, sellerDealerId);
    }

    @Override
    public int getCountByBeadingCarId(Integer beadingCarId) {
        return b2BRepo.countByBeadingCarId(beadingCarId);
    }

    @Override
    public List<B2BDto> getByStatus(Status requestStatus) {
        List<B2B> b2bList = b2BRepo.findByRequestStatus(requestStatus);

        if (b2bList.isEmpty()) {
            throw new RuntimeException("No B2B records found with status: " + requestStatus);
        }
        return b2bList.stream()
                .map(this::mapToB2BDto)
                .collect(Collectors.toList());
    }


    @Override
    public List<B2BPostDto> getByBuyerDealerId(Integer buyerDealerId) {
        List<B2B> b2bList = b2BRepo.findByBuyerDealerId(buyerDealerId);
        if (b2bList.isEmpty()) {
            throw new RuntimeException("No B2B records found for buyerDealerId: " + buyerDealerId);
        }
        return b2bList.stream()
                .map(this::mapToB2BPostDto)
                .collect(Collectors.toList());
    }


    @Override
    public List<B2BDto> getAllB2BRecords() {
        List<B2B> b2bList = b2BRepo.findAll();
        if (b2bList.isEmpty()) {
            throw new RuntimeException("No B2B records found.");
        }

        return b2bList.stream()
                .map(this::mapToB2BDto)
                .collect(Collectors.toList());
    }


    @Override
    public void deleteB2B(Integer b2BId) {
        B2B b2b = b2BRepo.findById(b2BId)
                .orElseThrow(() -> new RuntimeException("B2B not found with id: " + b2BId));
        b2BRepo.delete(b2b);
    }

    @Override
    public B2B updateB2B(Integer b2BId) {
        B2B existingB2B = b2BRepo.findById(b2BId)
                .orElseThrow(() -> new RuntimeException("B2B not found with id: " + b2BId));
        b2BRepo.save(existingB2B);
        return existingB2B;
    }


    private B2BPostDto mapToB2BPostDto(B2B b2b) {
        B2BPostDto dto = new B2BPostDto();
        dto.setBeadingCarId(b2b.getBeadingCarId());
        dto.setBuyerDealerId(b2b.getBuyerDealerId());
        dto.setTime(b2b.getTime().toLocalDate());
        return dto;
    }

    private B2BDto mapToB2BDto(B2B b2b) {
        B2BDto b2bDto = new B2BDto();

        b2bDto.setB2BId(b2b.getB2BId());
        b2bDto.setBeadingCarId(b2b.getBeadingCarId());
        b2bDto.setBuyerDealerId(b2b.getBuyerDealerId());
        b2bDto.setSellerDealerId(b2b.getSellerDealerId());
        b2bDto.setTime(LocalDate.from(b2b.getTime()));
        b2bDto.setMessage(b2b.getMessage());
        b2bDto.setRequestStatus(b2b.getRequestStatus());
        b2bDto.setSalesPersonId(b2b.getSalesPersonId());

        return b2bDto;
    }

}
