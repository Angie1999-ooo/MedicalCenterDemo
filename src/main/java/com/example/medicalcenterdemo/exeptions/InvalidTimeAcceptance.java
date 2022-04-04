package com.example.medicalcenterdemo.exeptions;

public class InvalidTimeAcceptance extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InvalidTimeAcceptance() {

        super( "Пациент уже записан к другому доктору на это время!");
    }
}
