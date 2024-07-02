package com.spring.jwt.repository;

import com.spring.jwt.dto.BidCarDto;
import com.spring.jwt.entity.BidCarPhoto;
import com.spring.jwt.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBidDoc extends JpaRepository<BidCarPhoto,Integer> {
    @Query("SELECT b FROM BidCarPhoto b WHERE b.carId = :carId AND b.doctype = :doctype")
    List<BidCarPhoto> findByDocumentTypeAndUserID(@Param("carId") Integer carId,@Param("doctype") String doctype);

    @Query("SELECT b FROM BidCarPhoto b WHERE b.carId = :carId")
    List<BidCarPhoto> findByCarId(@Param("carId") Integer carId);

}
