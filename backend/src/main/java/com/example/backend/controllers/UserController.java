package com.example.backend.controllers;

import com.example.backend.dto.LoginDTO;
import com.example.backend.models.User;
import com.example.backend.sevices.UserService;
import lombok.AllArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class UserController {
    private final UserService userService;

    @GetMapping("/")
    public String index() {
        return "main";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO loginDTO) {
        if (userService.authenticate(loginDTO)) {
            return ResponseEntity.ok().body(Map.of("message", "Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Login failed"));
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        if (userService.createUser(user)) {
            return ResponseEntity.ok().body(Map.of("message", "Registration successful"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Registration failed"));
        }
    }

    @PostMapping("/activate/{link}")
    public ResponseEntity<Object> activateUsers(@PathVariable String link, @RequestBody Integer code) {
        if (userService.activateUsers(link, code)) {
            return ResponseEntity.ok().body(Map.of("message", "Activate link successful"));
        }else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Activate failed"));
    }

    
}
