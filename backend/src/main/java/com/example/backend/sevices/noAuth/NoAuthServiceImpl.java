package com.example.backend.sevices.noAuth;

import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserRepository;
import com.example.backend.sevices.MailSender;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
@Slf4j
public class NoAuthServiceImpl implements NoAuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private MailSender mailSender;

    @Override
    public boolean createUser(User user) {
        String email = user.getEmail();
        if (userRepository.findByEmail(email) != null) {
            return false;
        }
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActivationLink(UUID.randomUUID().toString());
        user.setActivationCode(Integer.valueOf(IntStream.range(0, 6)
                .mapToObj(i -> String.valueOf(new Random().nextInt(10)))
                .collect(Collectors.joining())));
        user.setIsActive(false);
        String message = message(user);
        mailSender.send(user.getEmail(), "Activation code", message);
        log.info("Saving new user with : {}", email);
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


    public boolean activateUsers(String link,Integer code) {
        User user = userRepository.findByActivationLink(link);
        if (user == null) {
            return false;
        }
        if (!code.equals(user.getActivationCode())){
            log.info("Activating failed, incorrect activate code for user: {}", user.getEmail());
            return false;
        }
        user.setActivationLink(null);
        user.setActivationCode(null);
        user.setIsActive(true);
        userRepository.save(user);
        return true;
    }
}