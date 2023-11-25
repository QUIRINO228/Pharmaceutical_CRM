package com.example.backend.sevices.admin;

import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;



@Service
@AllArgsConstructor
public class AdminServiceImpl {
    private final UserRepository userRepository;


    @PostConstruct
    public void createAdminAccount() {
        User adminAccount = userRepository.findByRole(Role.ADMIN);
        if (adminAccount != null) return; ;
        User admin = new User();
        admin.setEmail("admin@gmail.com");
        admin.setIsActive(true);
        admin.setRole(Role.ADMIN);
        admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
        userRepository.save(admin);
    }

}
