package com.spring.jwt.repository;

import com.spring.jwt.entity.SaveCar;
import com.spring.jwt.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaveCarRepo extends JpaRepository<SaveCar,Integer> {

    List<SaveCar> findByUserId(int userId);
}
