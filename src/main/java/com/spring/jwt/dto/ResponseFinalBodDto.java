package com.spring.jwt.dto;

import com.spring.jwt.dto.BeedingDtos.PlacedBidDTO;
import lombok.Data;

import java.util.List;

@Data
public class ResponseFinalBodDto {
        private String message;
        private List<FinalBidDto> finalBids;
        private String exception;

        public ResponseFinalBodDto(String message, List<FinalBidDto> finalBids, String exception) {
            this.message = message;
            this.finalBids = finalBids;
            this.exception = exception;
        }
    }