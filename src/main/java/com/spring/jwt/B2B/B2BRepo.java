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
}

