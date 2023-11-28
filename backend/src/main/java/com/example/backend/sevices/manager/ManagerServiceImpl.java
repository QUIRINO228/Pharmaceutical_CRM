package com.example.backend.sevices.manager;

import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ManagerServiceImpl implements ManagerService{

    private final UserRepository userRepository;

    @PostConstruct
    public void createManagerAccount() {
        List<User> managerAccounts = userRepository.findByRole(Role.MANAGER);
        if (!managerAccounts.isEmpty()) {
            return;
        }
        User manager = new User();
        manager.setEmail("manager@gmail.com");
        manager.setIsActive(true);
        manager.setRole(Role.MANAGER);
        manager.setPassword(new BCryptPasswordEncoder().encode("manager"));
        userRepository.save(manager);
    }
}
