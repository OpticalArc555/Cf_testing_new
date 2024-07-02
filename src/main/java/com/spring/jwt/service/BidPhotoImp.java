package com.spring.jwt.service;

import com.spring.jwt.Interfaces.IBidPhoto;
import com.spring.jwt.dto.BidCarDto;
import com.spring.jwt.entity.BidCarPhoto;
import com.spring.jwt.repository.IBidDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public Object getByCarID(Integer beadingCarId) {
         List<BidCarPhoto> object = iBidDoc.findByCarId(beadingCarId);
        if (object.size() == 0)throw new RuntimeException("invalid beadingCarId");
        return object;
    }

    @Override
    public Object getCarIdType(Integer beadingCarId, String doctype) {
        List<BidCarPhoto> object = iBidDoc.findBydocTypeAndbeadingCarId(beadingCarId,doctype);
        if (object.size() == 0)throw new RuntimeException("invalid beadingCarId or doctype");
        return object;
    }

    @Override
    public Object getById(Integer documentId) {
        return iBidDoc.findById(documentId);
    }

    @Override
    public List<BidCarDto> getByDocumentType(Integer beadingCarId, String documentType) {
        List<BidCarPhoto> bidCarPhotos = iBidDoc.findBybeadingCarIdAndDocumentType(beadingCarId, documentType);
        if (bidCarPhotos.isEmpty()) {
            throw new RuntimeException("No documents found for the given car ID and document type");
        }
        return bidCarPhotos.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private BidCarDto convertToDto(BidCarPhoto bidCarPhoto) {
        BidCarDto bidCarDto = new BidCarDto();
        bidCarDto.setBeadingCarId(bidCarPhoto.getBeadingCarId());
        bidCarDto.setDocumentType(bidCarPhoto.getDocumentType());
        bidCarDto.setDocumentLink(bidCarPhoto.getDocumentLink());
        bidCarDto.setDoctype(bidCarPhoto.getDoctype());
        bidCarDto.setSubtype(bidCarPhoto.getSubtype());
        bidCarDto.setComment(bidCarPhoto.getComment());
        return bidCarDto;
    }


}
