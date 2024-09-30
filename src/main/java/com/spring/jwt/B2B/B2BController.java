package com.spring.jwt.B2B;

import com.spring.jwt.B2B.B2BService;
import com.spring.jwt.dto.*;
import com.spring.jwt.B2B.B2B;
import com.spring.jwt.entity.Dealer;
import com.spring.jwt.entity.Status;
import com.spring.jwt.B2B.B2BNotFoundExceptions;
import com.spring.jwt.exception.CarNotFoundException;
import com.spring.jwt.B2B.RequestAlreadyActiveException;
import com.spring.jwt.exception.UserNotFoundExceptions;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/B2B")
@RequiredArgsConstructor
public class B2BController {

    private final B2BService b2BService;


    @PostMapping("/createB2B")
    public ResponseEntity<?> B2BCreate(@RequestBody B2BDto b2BDto) {
        try {
            if (b2BDto.getRequestStatus() != Status.ACTIVE &&
                    b2BDto.getRequestStatus() != Status.DEACTIVATE &&
                    b2BDto.getRequestStatus() != Status.SOLD) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new B2BNotFoundResponse("Invalid Status", "Only Active, Deactivate, or Sold statuses are allowed."));
            }
            String string = b2BService.addB2B(b2BDto);
            return ResponseEntity.status(HttpStatus.OK).body(new B2bResponse("Request Submitted Successfully", string));
        } catch (CarNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new B2BNotFoundResponse("Car Not Found", "Car with ID " + b2BDto.getBeadingCarId() + " not found."));
        } catch (UserNotFoundExceptions e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new B2BNotFoundResponse("User Not Found", "User with Dealer ID " + b2BDto.getBuyerDealerId() + " not found."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new B2BNotFoundResponse("Request Failed", e.getMessage()));
        }
    }

    @GetMapping("/dealer/{beadingCarId}")
    public ResponseEntity<Dealer> getDealerByCarId(@PathVariable Integer beadingCarId) {
        Dealer dealer = b2BService.getDealerByCarId(beadingCarId);
        return ResponseEntity.ok(dealer);
    }


    @GetMapping("/user-info/{dealerId}")
    public ResponseEntity<?> getUserInfoByDealerId(@PathVariable Integer dealerId) {
        try {
            UserInfoDto userInfoDto = b2BService.getUserInfoFromDealerId(dealerId);
            return ResponseEntity.ok(userInfoDto);
        } catch (UserNotFoundExceptions e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new B2BNotFoundResponse("User Not Found", "User associated with Dealer ID " + dealerId + " not found."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new B2BNotFoundResponse("Error Retrieving User Info", e.getMessage()));
        }
    }


    @GetMapping("/getB2BById/{id}")
    public ResponseEntity<?> getB2BById(@PathVariable Integer id) {
        try {
            B2B b2B = b2BService.getB2BById(id);
            return ResponseEntity.ok(b2B);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new B2BNotFoundResponse("B2B Not Found", e.getMessage()));
        }
    }

    @GetMapping("/GetAll")
    public ResponseEntity<List<B2B>> getAllB2BRecords() {
        List<B2B> b2BRecords = b2BService.getAllB2BRecords();
        return ResponseEntity.ok(b2BRecords);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
        try {
            b2BService.deleteB2B(id);
            return ResponseEntity.ok("B2B deleted successfully!");
        } catch (B2BNotFoundExceptions e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new B2BNotFoundResponse("B2B Not Found", e.getMessage()));

        }
    }

    @GetMapping("/count")
    public ResponseEntity<ResponceDto> getCountByStatusAndDealer(
            @RequestParam Status requestStatus,
            @RequestParam int dealerId) {

        int b2bCount = b2BService.getB2BCountByStatusAndDealer(requestStatus, dealerId);

        ResponceDto responseDto = new ResponceDto("Success", b2bCount);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/ConfirmBooking/{id}")
    public ResponseEntity<?> updateB2B(@PathVariable Integer id) {
        try {
            B2B b2B = b2BService.updateB2B(id);
            B2bResponse response = new B2bResponse("success", "Car has been successfully sold.");
            response.setResponse(new B2BDto(b2B));
            return ResponseEntity.ok(response);
        } catch (B2BNotFoundExceptions e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new B2BNotFoundResponse("B2B Not Found", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new B2BNotFoundResponse("Update Failed", e.getMessage()));
        }
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelSoldRequest(@PathVariable Integer id) {
       try {
           b2BService.cancelSoldRequest(id);
           return ResponseEntity.ok("Sold request canceled and all deactivated requests reactivated.");
       }catch (B2BNotFoundExceptions e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new B2BNotFoundResponse("Something Went Wrong", e.getMessage()));
       } catch (RequestAlreadyActiveException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
    }
    }


    @GetMapping("/deactivatedRequest")
    public ResponseEntity<List<B2BDto>> getAllDeactivateRequests() {
        List<B2BDto> deactivatedRequests = b2BService.getAllDeactivateRequests();
        return ResponseEntity.ok(deactivatedRequests);
    }




}
