package com.example.medicalcenterdemo.rest;

import com.example.medicalcenterdemo.entity.User;
import com.example.medicalcenterdemo.repository.UserRepository;
import com.example.medicalcenterdemo.security.JwtTokenProvider;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.jsonwebtoken.io.Decoders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@Controller
@RequestMapping("/auth")
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;

    private final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    public AuthController(JwtTokenProvider jwtTokenProvider, UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/registration")
    public ResponseEntity registration(@RequestBody User user) {

        User patient = new User();

        patient.setEmail(user.getEmail());

        patient.setPassword(passwordEncoder.encode(user.getPassword()));

        patient.setRole(user.getRole());

        patient.setStatus(user.getStatus());

        userRepository.save(patient);


        return ResponseEntity.ok("save");

    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody User user) {

        log.info("info");
        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            User user1 = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User doesn't exist"));

            String token = jwtTokenProvider.createToken(user1.getEmail(), user1.getRole().name()
            );
            Map<Object, Object> response = new HashMap<>();
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtTokenProvider.AUTHORIZATION_HEADER, "Bearer " + token);
            return new ResponseEntity<>(new JWTToken(token), httpHeaders, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }

    static class JWTToken {

        private String idToken;

        JWTToken(String idToken) {
            this.idToken = idToken;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }

        void setIdToken(String idToken) {
            this.idToken = idToken;
        }
    }

}

