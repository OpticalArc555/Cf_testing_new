package com.spring.jwt.B2B;
import com.spring.jwt.entity.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "B2B")
public class B2B {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "B2BId", nullable = false)
    private Integer b2BId;

    @Column(name = "beadingCarId")
    private Integer beadingCarId;

    @Column(name = "buyerDealerId")
    private Integer buyerDealerId;

    @Column(name = "sellerDealerId")
    private Integer sellerDealerId;

    @Column(name = "time")
    private LocalDateTime time;

    @Column(name = "message")
    private String message;

    @Column(name = "requestStatus")
    private Status requestStatus;

    @Column(name = "salesPersonId")
    private Integer salesPersonId;



}
