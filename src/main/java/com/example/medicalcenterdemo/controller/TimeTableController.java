package com.example.medicalcenterdemo.controller;

import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Speciality;
import com.example.medicalcenterdemo.entity.Timetable;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.TimetableRepository;
import com.example.medicalcenterdemo.service.TimeTableService;
import io.github.jhipster.web.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/timetable")
public class TimeTableController {
    @Autowired
    TimeTableService timeTableService;

    @Autowired
    TimetableRepository timetableRepository;


    @Autowired
    DoctorRepository doctorRepository;


    @GetMapping(params = {"doctor"})
    public ResponseEntity getByDoctor(@RequestParam(value = "doctor" ,defaultValue = "20") Doctor doctor) {

        return ResponseEntity.ok(timeTableService.getByDoctor(doctor));
    }


    @GetMapping("{id}")
    public ResponseEntity getOne(@PathVariable Long id) {

        return ResponseUtil.wrapOrNotFound(timeTableService.getOne(id));
    }


    @PostMapping
    public ResponseEntity addTimetable(@RequestBody List<Timetable> timetable) throws URISyntaxException {

        return ResponseEntity.ok(timeTableService.addTimetable(timetable));
    }

    @PutMapping
    public ResponseEntity updateTimetable( @RequestBody List<Timetable> timetable) throws Exception {

        return ResponseEntity.ok(timeTableService.updateTimetable(timetable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTimetable(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(timeTableService.delete(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка");
        }
    }
}





