package com.example.medicalcenterdemo.repository;

import com.example.medicalcenterdemo.entity.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SatisticRepository extends JpaRepository<Statistic, Long> {

    List<Statistic>  findAllByStartDateBetween(LocalDate startDate,LocalDate endDate);

}
