package com.example.backend.sevices.user;

import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import com.example.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    @PostConstruct
    public void createUserAccount() {
        List<User> userAccounts = userRepository.findByRole(Role.USER);
        if (!userAccounts.isEmpty()) {
            return;
        }
        User user = new User();
        user.setEmail("user@gmail.com");
        user.setIsActive(true);
        user.setRole(Role.USER);
        user.setPassword(new BCryptPasswordEncoder().encode("user"));
        userRepository.save(user);
    }

}
