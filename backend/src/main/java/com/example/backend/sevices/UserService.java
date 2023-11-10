package com.example.backend.sevices;

import com.example.backend.dto.LoginDTO;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.models.enums.Role;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean createUser(User user) {
        String username = user.getUsername();
        if (userRepository.findByEmail(username) != null) {
            return false;
        }
        user.getRoles().add(Role.ROLE_WORKER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsActive(true);
        log.info("Saving new user with : {}", username);
        userRepository.save(user);
        return true;
    }


    public boolean authenticate(LoginDTO loginDTO) {
        return authenticateUser(loginDTO.getEmail(), loginDTO.getPassword());
    }

    public boolean authenticateUser(String username, String password) {
        log.info("Attempting to authenticate user: {}", username);

        User user = userRepository.findByEmail(username);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            log.info("Authentication successful for user: {}", username);
            return true;
        } else {
            log.warn("Authentication failed for user: {}", username);
            return false;
        }
    }
}
