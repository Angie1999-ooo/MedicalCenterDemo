package com.example.medicalcenterdemo.exeptions;

public class InvalidTimeAcceptance extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InvalidTimeAcceptance() {

        super( "The patient is already booked with another doctor for this time!");
    }
}
