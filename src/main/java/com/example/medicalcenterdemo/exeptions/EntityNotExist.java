package com.example.medicalcenterdemo.exeptions;

public class EntityNotExist extends RuntimeException{

    private static final long serialVersionUID = 1L;


    public EntityNotExist() {

        super( " Entry does not exist");
    }
}
