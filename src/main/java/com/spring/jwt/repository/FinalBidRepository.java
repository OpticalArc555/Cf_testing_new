package com.spring.jwt.repository;

import com.spring.jwt.entity.FinalBid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinalBidRepository extends JpaRepository<FinalBid, Integer> {
    boolean existsByBidCarId(Integer bidCarId);
}