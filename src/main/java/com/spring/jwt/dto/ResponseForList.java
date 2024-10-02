package com.spring.jwt.dto;

import lombok.Data;

import java.util.List;

@Data
public class ResponseForList {
    private String message;
    private List<Object> object;
    private String exception;

    public ResponseForList(String message) {
        this.message = message;
    }

    public ResponseForList(String failedToAddConfirmBooking, Object o, String message) {
    }
}
