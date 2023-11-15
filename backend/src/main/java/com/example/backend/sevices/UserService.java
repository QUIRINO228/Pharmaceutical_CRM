package com.example.backend.sevices;

import com.example.backend.dto.LoginDTO;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.models.enums.Role;

import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private MailSender mailSender;

    public boolean createUser(User user) {
        String username = user.getUsername();
        if (userRepository.findByEmail(username) != null) {
            return false;
        }
        user.getRoles().add(Role.ROLE_WORKER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActivationLink(UUID.randomUUID().toString());
        user.setActivationCode(IntStream.range(0, 6)
                .mapToObj(i -> String.valueOf(new Random().nextInt(10)))
                .collect(Collectors.joining()));
        user.setIsActive(true);
        String message = message(user);
        mailSender.send(user.getEmail(), "Activation code", message);
        log.info("Saving new user with : {}", username);
        userRepository.save(user);
        return true;
    }


    public String message(User user) {
        return String.format(
                "Hello, %s! \n" +
                        "Welcome in AnRo pharmacy. Please visit the following link to activate your account and enter the instructions code %s: http://localhost:4200/activate/%s",
                user.getEmail(),
                user.getActivationCode(),
                user.getActivationLink()
        );
    }

    public boolean activateUsers(String link,String code) {
        User user = userRepository.findByActivationLink(link);
        if (user == null) {
            return false;
        }
        if (!code.equals(user.getActivationCode())){
            log.info("Activating failed, incorrect activate code for user: {}", user.getUsername());
            return false;
        }
        user.setActivationLink(null);
        user.setActivationCode(null);
        user.setIsActive(true);
        userRepository.save(user);
        return true;
    }


    public boolean authenticate(LoginDTO loginDTO) {
        return authenticateUser(loginDTO.getEmail(), loginDTO.getPassword());
    }

    public boolean authenticateUser(String username, String password) {
        log.info("Attempting to authenticate user: {} {}", username, password);
        User user = userRepository.findByEmail(username);
        if (user == null) {
            log.info("User not found: {}", username);
            return false;
        }
        if (!user.getIsActive() ) {
            log.info("Authentication failed for user. Visit your mail to activate your account: {}", username);
            return false;
        }
        if (passwordEncoder.matches(password, user.getPassword())) {
            log.info("Authentication successful for user: {}", username);
            return true;
        } else {
            log.warn("Authentication failed for user: {}", username);
            return false;
        }
    }
}
