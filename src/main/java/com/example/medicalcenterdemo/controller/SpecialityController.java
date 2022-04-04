package com.example.medicalcenterdemo.controller;

import com.example.medicalcenterdemo.service.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/speciality")
public class SpecialityController {

    @Autowired
    private SpecialityService specialityService;

    @GetMapping
    public ResponseEntity getAll() {
        
        return ResponseEntity.ok(specialityService.getAll());
    }



    @GetMapping("/{id}")
    public ResponseEntity getOne(@PathVariable Long id) {

        return ResponseEntity.ok(specialityService.getOne(id));
    }


}
