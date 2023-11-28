package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.sevices.noAuth.NoAuthService;
import com.example.backend.sevices.user.UserService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
public class NoAuthController {

    private final NoAuthService noAuthService;

    @PostMapping("/registration")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        if (noAuthService.createUser(user)) {
            return ResponseEntity.ok().body(Map.of("message", "Registration successful"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Registration failed"));
        }
    }

    @PostMapping("/activate/{link}")
    public ResponseEntity<Object> activateUsers(@PathVariable String link, @RequestBody Integer code) {
        if (noAuthService.activateUsers(link, code)) {
            return ResponseEntity.ok().body(Map.of("message", "Activate link successful"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Activate failed"));
    }

}
