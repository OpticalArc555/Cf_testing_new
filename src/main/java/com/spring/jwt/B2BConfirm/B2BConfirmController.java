package com.spring.jwt.B2BConfirm;

import com.spring.jwt.dto.ResponseForList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/b2bConfirm")
@RequiredArgsConstructor
public class B2BConfirmController {

    private final B2bConfirmServices b2bConfirmServices;

    @PostMapping("/add")
    public ResponseEntity<ResponseForList> addConfirmBooking(@RequestBody B2bConfirmPostDto b2bConfirmPostDto) {
        try {
            String message = b2bConfirmServices.addConfirmBooking(b2bConfirmPostDto);
            return ResponseEntity.ok(new ResponseForList(message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseForList("Failed ", null, e.getMessage()));
        }
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<ResponseForList> cancelConfirmBooking(@RequestParam Integer b2BConfirmId) {
        try {
            String message = b2bConfirmServices.cancelConfirmBooking(b2BConfirmId);
            return ResponseEntity.ok(new ResponseForList(message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseForList("Failed to cancel confirm booking", null, e.getMessage()));
        }
    }

    @GetMapping("/buyerId")
    public ResponseEntity<ResponseForList> getByBuyerDealerId(@RequestParam Integer buyerDealerId) {
        try {
            List<B2BConfirmDto> result = b2bConfirmServices.getByBuyerDealerId(buyerDealerId);
            return ResponseEntity.ok(new ResponseForList("Records found", Collections.singletonList(result), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseForList("Error fetching records", null, e.getMessage()));
        }
    }

    @GetMapping("/sellerId")
    public ResponseEntity<ResponseForList> getBySellerDealerId(@RequestParam Integer sellerDealerId) {
        try {
            List<B2BConfirmDto> result = b2bConfirmServices.getBySellerDealerId(sellerDealerId);
            return ResponseEntity.ok(new ResponseForList("Records found", Collections.singletonList(result), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseForList("Error fetching records", null, e.getMessage()));
        }
    }

    @GetMapping("/salespersonId")
    public ResponseEntity<ResponseForList> getBySalesPersonId(@RequestParam Integer salesPersonId) {
        try {
            List<B2BConfirmDto> result = b2bConfirmServices.getBySalesPersonId(salesPersonId);
            return ResponseEntity.ok(new ResponseForList("Records fetched successfully", Collections.singletonList(result), "success"));
        } catch (RuntimeException e) {
            // Returning proper error message with exception details
            return ResponseEntity.badRequest().body(new ResponseForList("Error fetching records", null, e.getMessage()));
        }
    }

}
