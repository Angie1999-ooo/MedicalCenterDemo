package com.example.medicalcenterdemo.exeptions;

public class SpecialityNotFound extends RuntimeException {

    private static final long serialVersionUID = 1L;


    public SpecialityNotFound() {

        super( "Поле специальность пустое!");
    }
}
