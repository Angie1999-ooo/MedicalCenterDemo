package com.example.medicalcenterdemo.exeptions;

public class EntityAlreadyExist extends RuntimeException{

    private static final long serialVersionUID = 1L;


    public EntityAlreadyExist() {

        super( "Запись уже существует");
    }
}
