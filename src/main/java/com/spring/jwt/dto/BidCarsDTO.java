package com.spring.jwt.dto;

import com.spring.jwt.entity.BeadingCAR;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
public class BidCarsDTO {

    private Integer bidCarId;
    private Integer beadingCarId;
    private LocalDateTime createdAt;
    private LocalDateTime startTime;
    private Integer basePrice;
    private Integer userId;
    private LocalDateTime closingTime;


    public BidCarsDTO(BeadingCAR beadingCAR) {
    }
}
