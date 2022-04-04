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



    @GetMapping(params={"page","limit"})
    public ResponseEntity getAll(@RequestParam(value = "page" ,defaultValue = "0") int page,
                                 @RequestParam(value = "limit",defaultValue = "5") int limit){

        return ResponseEntity.ok(timeTableService.getAll(page,limit));

    }


    @GetMapping(params = {"doctor"})
    public ResponseEntity getByDoctor(@RequestParam(value = "doctor" ,defaultValue = "20") Doctor doctor) {

        return ResponseEntity.ok(timeTableService.getByDoctor(doctor));
    }

    @GetMapping(params = {"speciality","page","limit"})
    public ResponseEntity getBySpeciality(@RequestParam(value = "speciality" ,defaultValue = "20")Speciality speciality,@RequestParam(value = "page" ,defaultValue = "0") int page,
            @RequestParam(value = "limit",defaultValue = "5") int limit)  {

        return ResponseEntity.ok(timeTableService.getAllBySpeciality(speciality,page,limit));
    }

    @GetMapping("{id}")
    public ResponseEntity getOne(@PathVariable Long id) {

        return ResponseUtil.wrapOrNotFound(timeTableService.getOne(id));
    }

    @GetMapping(params={"fullName", "page", "limit"})
    public ResponseEntity getByName(@RequestParam(value="fullName")String fullName, @RequestParam(value = "page", defaultValue = "1") int page,
                                    @RequestParam(value = "limit", defaultValue = "20") int limit )
    {

        return  ResponseEntity.ok(timeTableService.getByName(fullName,page, limit));
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





