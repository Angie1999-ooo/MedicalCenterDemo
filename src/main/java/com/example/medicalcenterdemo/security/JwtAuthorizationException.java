package com.example.medicalcenterdemo.security;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

@Getter
public class JwtAuthorizationException extends AuthenticationException {

    private final HttpStatus httpStatus;

    public JwtAuthorizationException(String msg,HttpStatus httpStatus) {
        super(msg);
        this.httpStatus=httpStatus;
    }

    public JwtAuthorizationException(String msg, Throwable cause, HttpStatus httpStatus) {
        super(msg, cause);
        this.httpStatus = httpStatus;
    }


}
