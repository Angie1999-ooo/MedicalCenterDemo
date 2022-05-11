package com.example.medicalcenterdemo.controller.auth;

import com.example.medicalcenterdemo.entity.User;
import com.example.medicalcenterdemo.repository.UserRepository;
import com.example.medicalcenterdemo.security.JwtTokenProvider;
import com.example.medicalcenterdemo.security.UserDetailsServiceImpl;
import com.example.medicalcenterdemo.service.UserService;
import com.example.medicalcenterdemo.service.dto.UserDTO;
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
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    private  final UserService patientService;

    public AuthController(JwtTokenProvider jwtTokenProvider, UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserDetailsServiceImpl userDetailsServiceImpl, UserService patientService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.patientService = patientService;

    }


    @PostMapping("/registration")
    public ResponseEntity registration(@RequestBody UserDTO user) {
        return ResponseEntity.ok(patientService.addUser(user));
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO user) {

        log.info("info");
        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            User user1 = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User doesn't exist"));

            String token = jwtTokenProvider.createToken(user1.getEmail(), user1.getRole().name()
            );
            Map<Object, Object> response = new HashMap<>();
            response.put("token",token);
            response.put("user",user1);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtTokenProvider.AUTHORIZATION_HEADER, "Bearer " + token);
            return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }


    @GetMapping("/activate/{code}")
    public ModelAndView activate(@PathVariable String code) {
        boolean isActivated = patientService.activateUser(code);

        HttpHeaders headers = new HttpHeaders();

        headers.add("Location", "localhost:3000/login");

        return new  ModelAndView("localhost:3000/login");
    }

}

