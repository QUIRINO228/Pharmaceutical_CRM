package com.example.backend.controllers;

import com.example.backend.dto.ForgotCodeDTO;
import com.example.backend.models.User;
import com.example.backend.sevices.noAuth.NoAuthService;
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

    @PostMapping("/forgot")
    public ResponseEntity<Object> forgot(@RequestBody String email) {
        if (noAuthService.forgotMessage(email)) {
            return ResponseEntity.ok().body(Map.of("message", "Successfully sending a message with a forgotten password"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Failed sending a message with a forgotten password"));
    }

    @PostMapping("/changePassword/{link}")
    public ResponseEntity<Object> changePassword(@PathVariable String link, @RequestBody ForgotCodeDTO forgotCodeDTO) {
        if (noAuthService.changePassword(link, forgotCodeDTO)) {
            return ResponseEntity.ok().body(Map.of("message", "Activate link successful"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Activate failed"));
    }
}
