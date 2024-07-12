package com.spring.jwt.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BiddingTimerRequestDTO {

    private Integer biddingTimerId;

    private Integer beadingCarId;

    private Integer userId;

    private Integer basePrice;

    private int durationMinutes;
}