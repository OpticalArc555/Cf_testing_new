package com.spring.jwt.dto;

import lombok.Data;

@Data
public class BidCarDto {

    private String documentType;

    private String documentLink;
    private Integer beadingCarId;

    private String doctype;
    private String subtype;
    private String comment;

}