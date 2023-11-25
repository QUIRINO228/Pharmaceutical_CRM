package com.example.backend.repositories;

import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Collection;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);

    User findByActivationLink(String link);


    User findByRole(Role role);
}