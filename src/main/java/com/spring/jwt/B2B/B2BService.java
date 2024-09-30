package com.spring.jwt.B2B;


import com.spring.jwt.entity.Dealer;
import com.spring.jwt.entity.Status;

import java.util.List;

public interface B2BService {
   String addB2B(B2BDto b2BDto);

   Dealer getDealerByCarId(Integer beadingCarId);


   UserInfoDto getUserInfoFromDealerId(Integer dealerId);

   B2B getB2BById(Integer id);

   List<B2B> getAllB2BRecords();


   void deleteB2B(Integer id);


   int getB2BCountByStatusAndDealer(Status requestStatus, int dealerId);

   B2B updateB2B(Integer id);

   void cancelSoldRequest(Integer id);

   List<B2BDto> getAllDeactivateRequests();
}
