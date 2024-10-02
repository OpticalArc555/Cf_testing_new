package com.spring.jwt.B2BConfirm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface B2BConfirmRepo extends JpaRepository<B2BConfirm, Integer> {

    Optional<B2BConfirm> findByBeadingCarId(Integer beadingCarId);

    List<B2BConfirm> findByBuyerDealerId(Integer buyerDealerId);

    List<B2BConfirm> findBySellerDealerId(Integer sellerDealerId);

    List<B2BConfirm> findBySalesPersonId(Integer salesPersonId);
}
