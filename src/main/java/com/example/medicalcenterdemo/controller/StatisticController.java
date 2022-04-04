package com.example.medicalcenterdemo.controller;


import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Statistic;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.SatisticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/statistic")
public class StatisticController {

    @Autowired
    SatisticRepository satisticRepository;

    @GetMapping()
    public ResponseEntity getAllBy() {
        
        return  ResponseEntity.ok(satisticRepository.findAll());

    }


    @GetMapping(params = {"endDate", "period"})
    public ResponseEntity getAllBy( @RequestParam(value = "endDate")   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                   @RequestParam(value = "period") String period) {

        LocalDate startDate = LocalDate.now();

        switch (period) {
            case "Неделя":
                startDate = endDate.minusWeeks(1);
                break;
            case "Месяц":
                startDate = endDate.minusMonths(1);
                break;
            case "Год":
                startDate = endDate.minusYears(1);
                break;
            default:
                return  ResponseEntity.ok( satisticRepository.findAll());

        }

        return  ResponseEntity.ok(satisticRepository.findAllByStartDateBetween(startDate,endDate));

    }

    @PostMapping
    public ResponseEntity addDoctor(@RequestBody Statistic records) throws URISyntaxException {

        try {
            return ResponseEntity.ok(satisticRepository.save(records));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Can't create ");
        }
    }
}
