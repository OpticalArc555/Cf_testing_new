package com.spring.jwt.service;

import com.spring.jwt.Interfaces.IBidPhoto;
import com.spring.jwt.dto.BidCarDto;
import com.spring.jwt.entity.BidCarPhoto;
import com.spring.jwt.repository.IBidDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
         List<BidCarPhoto> object = iBidDoc.findByCarId(carId);
        if (object.size() == 0)throw new RuntimeException("invalid carid");
        return object;
    }

    @Override
    public Object getCarIdType(Integer carId, String docType) {
        List<BidCarPhoto> object = iBidDoc.findByDocumentTypeAndUserID(carId,docType);
        if (object.size() == 0)throw new RuntimeException("invalid carid or doctype");
        return object;
    }

    @Override
    public Object getById(Integer documentId) {
        return iBidDoc.findById(documentId);
    }
}
