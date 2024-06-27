package com.spring.jwt.repository;

import com.spring.jwt.dto.BidCarDto;
import com.spring.jwt.entity.BidCarPhoto;
import com.spring.jwt.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBidDoc extends JpaRepository<BidCarPhoto,Integer> {
    @Query("SELECT jfq FROM Document jfq WHERE jfq.carId = :carId")
    List<BidCarPhoto> findByCarId(Integer carId);
    @Query("SELECT jfq FROM Document jfq WHERE jfq.carId = :carId AND jfq.documentType = :documentType")
    public List<BidCarPhoto> findByDocumentTypeAndUserID(Integer carId, String documentType);

}
