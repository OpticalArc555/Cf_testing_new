package com.spring.jwt.B2B;

import com.spring.jwt.B2B.B2B;
import com.spring.jwt.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface B2BRepo extends JpaRepository<B2B, Integer> {


    int countByRequestStatusAndBuyerDealerId(Status requestStatus, int dealerId);


    List<B2B> findByRequestStatus(Status status);

    List<B2B> findByRequestStatusAndBeadingCarId(Status requestStatus, Integer beadingCarId);

    int countByRequestStatusAndSellerDealerId(Status requestStatus, Integer sellerDealerId);

    List<B2B> findByBuyerDealerId(Integer buyerDealerId);

    int countByBeadingCarId(Integer beadingCarId);
}

