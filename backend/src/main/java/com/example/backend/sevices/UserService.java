package com.example.backend.sevices;

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
        String email = user.getEmail();
        if (userRepository.findByEmail(email) != null) {
            return false;
        }
        user.getRoles().add(Role.ROLE_WORKER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsActive(true);
        log.info("Saving new user with : {}", email);
        userRepository.save(user);

        return true;
    }

}
