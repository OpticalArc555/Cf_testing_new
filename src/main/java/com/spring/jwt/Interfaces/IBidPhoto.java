package com.spring.jwt.Interfaces;

import com.spring.jwt.dto.BidCarDto;

import java.util.List;

public interface IBidPhoto {
    String addDocument(BidCarDto documentDto);

    String deleteById(Integer documentId);


    Object getByCarID(Integer beadingCarId);

    Object getCarIdType(Integer beadingCarId, String doctype);

    Object getById(Integer documentId);

    List<BidCarDto> getByDocumentType(Integer beadingCarId, String documentType);
}
