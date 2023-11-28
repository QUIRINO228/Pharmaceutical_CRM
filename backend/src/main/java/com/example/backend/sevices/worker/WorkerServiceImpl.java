package com.example.backend.sevices.worker;

import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WorkerServiceImpl implements WorkerService {


    private final UserRepository userRepository;

    @PostConstruct
    public void createWorkerAccount() {
        List<User> workerAccounts = userRepository.findByRole(Role.WORKER);
        if (!workerAccounts.isEmpty()) {
            return;
        }
        User user = new User();
        user.setEmail("worker@gmail.com");
        user.setIsActive(true);
        user.setRole(Role.WORKER);
        user.setPassword(new BCryptPasswordEncoder().encode("worker"));
        userRepository.save(user);
    }

}
