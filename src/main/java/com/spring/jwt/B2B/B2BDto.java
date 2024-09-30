package com.spring.jwt.B2B;

import com.spring.jwt.B2B.B2B;
import com.spring.jwt.entity.Status;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class B2BDto {

    private int beadingCarId;

    private Integer buyerDealerId;

    private Integer sellerId;

    private LocalDateTime time;

    private String message;

    private Status requestStatus;


    private Integer userId;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String email;
    private String mobileNo;


    public B2BDto(B2B b2B){
        this.beadingCarId =b2B.getBeadingCarId();
        this.buyerDealerId= b2B.getBuyerDealerId();
        this.sellerId= b2B.getSellerId();
        this.time=b2B.getTime();
        this.message= b2B.getMessage();
        this.requestStatus=b2B.getRequestStatus();
    }


    public B2BDto(int beadingCarId, Integer buyerDealerId, Integer sellerId, LocalDateTime time, String message,
                  Integer userId, String firstName, String lastName, String address, String city, String email, String mobileNo) {
        this.beadingCarId = beadingCarId;
        this.buyerDealerId = buyerDealerId;
        this.sellerId = sellerId;
        this.time = time;
        this.message = message;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
        this.mobileNo = mobileNo;
    }

}
