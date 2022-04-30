package com.example.medicalcenterdemo.controller;

import com.example.medicalcenterdemo.entity.Doctor;
import com.example.medicalcenterdemo.entity.Timetable;
import com.example.medicalcenterdemo.repository.DoctorRepository;
import com.example.medicalcenterdemo.repository.TimetableRepository;
import com.example.medicalcenterdemo.service.TimeTableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;


@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/timetable")
public class TimeTableController {

   private final TimeTableService timeTableService;

   private final TimetableRepository timetableRepository;

    private final DoctorRepository doctorRepository;

    public TimeTableController(TimeTableService timeTableService, TimetableRepository timetableRepository, DoctorRepository doctorRepository) {
        this.timeTableService = timeTableService;
        this.timetableRepository = timetableRepository;
        this.doctorRepository = doctorRepository;
    }


    @GetMapping(params = {"doctor"})
    public ResponseEntity getByDoctor(@RequestParam(value = "doctor" ,defaultValue = "20") Doctor doctor) {

        return ResponseEntity.ok(timeTableService.getByDoctor(doctor));
    }


    @GetMapping("{id}")
    public ResponseEntity getOne(@PathVariable Long id) {

        return ResponseEntity.ok(timeTableService.getOne(id));
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
            return ResponseEntity.badRequest().body("An error has occurred");
        }
    }
}





