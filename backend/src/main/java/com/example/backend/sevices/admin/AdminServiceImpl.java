package com.example.backend.sevices.admin;

import com.example.backend.dto.UserDto;
import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount() {
        List<User> adminAccounts = userRepository.findByRole(Role.ADMIN);
        if (!adminAccounts.isEmpty()) {
            return;
        }
        User admin = new User();
        admin.setEmail("admin@gmail.com");
        admin.setIsActive(true);
        admin.setRole(Role.ADMIN);
        admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
        userRepository.save(admin);
    }

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(User::userDto).collect(Collectors.toList());
    }
}
