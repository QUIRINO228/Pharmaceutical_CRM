package com.example.backend.repositories;

import com.example.backend.models.Basket;
import com.example.backend.models.Task;
import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);

    User findByActivationLink(String link);
    User findByForgotLink(String link);

    List<User> findByRole(Role role);

}