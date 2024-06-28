package com.spring.jwt.Interfaces;

import com.spring.jwt.dto.BidCarDto;

public interface IBidPhoto {
    String addDocument(BidCarDto documentDto);

    String deleteById(Integer documentId);



    Object getByCarID(Integer carId);

    Object getCarIdType(Integer carId, String docType);

    Object getById(Integer documentId);
}
