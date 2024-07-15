package com.spring.jwt.service;

import com.spring.jwt.Interfaces.BookingService;
import com.spring.jwt.Interfaces.ICarRegister;
import com.spring.jwt.dto.BookingDto;
import com.spring.jwt.dto.CarDto;
import com.spring.jwt.entity.*;
import com.spring.jwt.exception.*;
import com.spring.jwt.repository.BookingRepository;
import com.spring.jwt.repository.CarRepo;
import com.spring.jwt.repository.PendingBookingRepository;
import com.spring.jwt.repository.TempPendingBookingReqRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor

public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ICarRegister iCarRegister;
    private final PendingBookingRepository pendingBookingRepository;
    private final CarRepo carRepo;
    private final TempPendingBookingReqRepository tempPendingBookingReqRepository;

    @Override
    public BookingDto saveBooking(BookingDto bookingDto) {
        CarDto car = iCarRegister.findById(bookingDto.getCarId());
        if (car == null) {
            throw new EntityNotFoundException("Car not found with ID: " + bookingDto.getCarId());
        }

        if (car.getCarStatus() == Status.SOLD) {
            throw new BookingException("Car is not available for booking as it's already sold.");
        }

        Booking booking = new Booking();
        BeanUtils.copyProperties(bookingDto, booking);
        booking.setStatus("confirm");
        booking = bookingRepository.save(booking);

        List<PendingBooking> pendingBookings = pendingBookingRepository.findByCarCarId(bookingDto.getCarId());
        if (!pendingBookings.isEmpty()) {
            Car carEntity = carRepo.findById(bookingDto.getCarId())
                    .orElseThrow(() -> new EntityNotFoundException("Car not found with ID: " + bookingDto.getCarId()));
            carEntity.setCarStatus(Status.SOLD);
            carRepo.save(carEntity);

            Integer confirmedBookingId = booking.getId();

            List<TempPendingBookingReq> tempBookings = pendingBookings.stream()
                    .filter(pendingBooking -> !pendingBooking.getId().equals(confirmedBookingId))
                    .map(pendingBooking ->
                    {
                        TempPendingBookingReq tempPendingBookingReq = new TempPendingBookingReq();
                        BeanUtils.copyProperties(pendingBooking, tempPendingBookingReq);
                        if (tempPendingBookingReq.getCreatedDate() == null) {
                            tempPendingBookingReq.setCreatedDate(LocalDateTime.now());
                        }
                        return tempPendingBookingReq;
                    })
                    .collect(Collectors.toList());

            tempPendingBookingReqRepository.saveAll(tempBookings);

            pendingBookingRepository.deleteAll(pendingBookings);

        }

        pendingBookingRepository.deleteByCarCarId(bookingDto.getCarId());
        BookingDto savedBookingDto = new BookingDto();
        BeanUtils.copyProperties(booking, savedBookingDto);
        return savedBookingDto;
    }


    @Override
    public List<BookingDto> getAllBooking(int pageNo) {
        List<Booking> listOfBooking = bookingRepository.findAll();
        CarNotFoundException carNotFoundException;
        if((pageNo*10)>listOfBooking.size()-1){
            throw new PageNotFoundException("page not found");

        }
        if(listOfBooking.size()<=0){throw new BookingNotFound("car not found",HttpStatus.NOT_FOUND);}
//        System.out.println("list of de"+listOfCar.size());
        List<BookingDto> listOfBookingDto = new ArrayList<>();

        int pageStart=pageNo*10;
        int pageEnd=pageStart+10;
        int diff=(listOfBooking.size()) - pageStart;
        for(int counter=pageStart,i=1;counter<pageEnd;counter++,i++){
            if(pageStart>listOfBooking.size()){break;}

//            System.out.println("*");
            BookingDto bookingDto = new BookingDto(listOfBooking.get(counter));
            bookingDto.setId(listOfBooking.get(counter).getId());
            bookingDto.setDate(listOfBooking.get(counter).getDate());
            bookingDto.setPrice(listOfBooking.get(counter).getPrice());
            bookingDto.setCarId(listOfBooking.get(counter).getCarId());
            bookingDto.setUserId(listOfBooking.get(counter).getUserId());
            bookingDto.setDealerId(listOfBooking.get(counter).getDealerId());
            bookingDto.setStatus(listOfBooking.get(counter).getStatus());
           // bookingDto.setPendingBookingId(listOfBooking.get(counter).);
            listOfBookingDto.add(bookingDto);
            if(diff == i){
                break;
            }
        }

       System.out.println(listOfBookingDto);
        return listOfBookingDto;
    }

    @Override
    public BookingDto getAllBookingsByUserId(int userId) {
        Optional<Booking> booking=bookingRepository.findByUserId(userId);
        if (booking.isPresent()){
            return new BookingDto(booking.get());
        }else {
            throw new BookingNotFoundException("Booking not found");
        }
    }

    @Override
    public List<BookingDto> getAllBookingsByDealerId(int dealerId,int pageNo) {
        List<Booking> listOfBooking = bookingRepository.findByDealerId(dealerId);
        CarNotFoundException carNotFoundException;
        if((pageNo*10)>listOfBooking.size()-1){
            throw new PageNotFoundException("page not found");

        }
        if(listOfBooking.size()<=0){throw new BookingNotFound("car not found",HttpStatus.NOT_FOUND);}
//        System.out.println("list of de"+listOfCar.size());
        List<BookingDto> listOfBookingDto = new ArrayList<>();

        int pageStart=pageNo*10;
        int pageEnd=pageStart+10;
        int diff=(listOfBooking.size()) - pageStart;
        for(int counter=pageStart,i=1;counter<pageEnd;counter++,i++){
            if(pageStart>listOfBooking.size()){break;}

//            System.out.println("*");
            BookingDto bookingDto = new BookingDto(listOfBooking.get(counter));
            bookingDto.setId(listOfBooking.get(counter).getId());
            bookingDto.setDate(listOfBooking.get(counter).getDate());
            bookingDto.setPrice(listOfBooking.get(counter).getPrice());
            bookingDto.setCarId(listOfBooking.get(counter).getCarId());
            bookingDto.setUserId(listOfBooking.get(counter).getUserId());
            bookingDto.setDealerId(listOfBooking.get(counter).getDealerId());
            bookingDto.setStatus(listOfBooking.get(counter).getStatus());
            // bookingDto.setPendingBookingId(listOfBooking.get(counter).);
            listOfBookingDto.add(bookingDto);
            if(diff == i){
                break;
            }
        }

        System.out.println(listOfBookingDto);
        return listOfBookingDto;
    }

    @Override
    public BookingDto getBookingById(int id) {
       Optional<Booking> booking= bookingRepository.findById(id);
       if (booking.isPresent()){
           return new BookingDto(booking.get());
       }else {
           throw new BookingNotFoundException("No booking found");
       }
    }


    @Override
    public String editById(int id) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            booking.setStatus("cancel"); // Set booking status to "cancel"
            bookingRepository.save(booking);

            Optional<Car> carOptional = carRepo.findById(booking.getCarId());
            if (carOptional.isPresent()) {
                Car car = carOptional.get();
                car.setCarStatus(Status.ACTIVE); // Assuming Status is an enum and "ACTIVE" is one of its values
                carRepo.save(car);
            } else {
                throw new CarNotFoundException("No car found with this id");
            }
            return "Booking and Car status cancel successfully.";
        } else {
            throw new BookingNotFoundException("No booking found with this id");
        }
    }
}
