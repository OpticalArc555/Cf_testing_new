package com.spring.jwt.service;

import com.spring.jwt.Interfaces.IBidPhoto;
import com.spring.jwt.dto.BidCarDto;
import com.spring.jwt.entity.BidCarPhoto;
import com.spring.jwt.repository.IBidDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidPhotoImp implements IBidPhoto {
    @Autowired
    private IBidDoc iBidDoc;
    @Override
    public String addDocument(BidCarDto documentDto) {
        BidCarPhoto bidCarPhoto = new BidCarPhoto(documentDto);
        iBidDoc.save(bidCarPhoto);
        return "Bid photo added ";
    }

    @Override
    public String deleteById(Integer documentId) {
        iBidDoc.deleteById(documentId);
        return "bid photo deleted";
    }


    @Override
    public Object getByCarID(Integer carId) {
        return iBidDoc.findByCarId(carId);
    }

    @Override
    public Object getCarIdType(Integer carId, String docType) {
        return iBidDoc.findByDocumentTypeAndUserID(carId,docType);
    }

    @Override
    public Object getById(Integer documentId) {
        return iBidDoc.findById(documentId);
    }
}
