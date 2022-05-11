package com.example.medicalcenterdemo.service;

import com.example.medicalcenterdemo.entity.Role;
import com.example.medicalcenterdemo.entity.Status;
import com.example.medicalcenterdemo.entity.User;
import com.example.medicalcenterdemo.exeptions.EntityAlreadyExist;
import com.example.medicalcenterdemo.exeptions.EntityNotExist;
import com.example.medicalcenterdemo.repository.AcceptanceRepository;
import com.example.medicalcenterdemo.repository.UserRepository;
import com.example.medicalcenterdemo.service.dto.UserDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;


@Service
public class UserService {


    final private  AcceptanceRepository acceptanceRepository;

    private final UserRepository userRepository;

    private final MailSender mailSender;

    private final PasswordEncoder passwordEncoder;

    public UserService(AcceptanceRepository acceptanceRepository, UserRepository userRepository, MailSender mailSender, PasswordEncoder passwordEncoder) {
        this.acceptanceRepository = acceptanceRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    public User addPatient(User patient) throws EntityAlreadyExist {

        if (patient.getId() != null) {
            throw new EntityAlreadyExist();
        }
        else {
            userRepository.save(patient);
        }

        return patient;
    }

    public User updatePatient(User patient) throws EntityNotExist
    {
        if(patient.getId()==null)
        {
            throw new EntityNotExist();
        }

        return  userRepository.save(patient);
    }

    public List<User> getPatient()
    {
        return userRepository.findAll();
    }

    public User getOne(Long id)
    {
        return  userRepository.findById(id).get();
    }

    public Long delete(Long id) {

        userRepository.deleteById(id);

        return id;
    }

    public boolean addUser(UserDTO userDTO) {

        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            return false;
        }
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setStatus(Status.ACTIVE);
        user.setRole(Role.ADMIN);
        user.setActivationKey(UUID.randomUUID().toString());

        userRepository.save(user);

        if (!StringUtils.isEmpty(userDTO.getEmail())) {
            String message = String.format(
                    "Hello, %s! \n" +
                            "Welcome to Medical Center. Please, visit next link: http://localhost:8080/activate/%s",
                    userDTO.getEmail(),
                    userDTO.getActivationKey()
            );
            mailSender.send(userDTO.getEmail(), "Activation code", message);
        }

        return true;
    }

    public boolean activateUser(String code) {

        User user = userRepository.findByActivationKey(code);

        if (user == null) {
            return false;
        }

        user.setActivationKey(null);

        userRepository.save(user);

        return true;
    }

}
