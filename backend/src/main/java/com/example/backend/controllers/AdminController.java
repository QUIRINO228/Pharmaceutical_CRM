package com.example.backend.controllers;

import com.example.backend.dto.UserDto;
import com.example.backend.sevices.admin.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    private ResponseEntity<List<UserDto>> getUsers() {
        List<UserDto> users = adminService.getUsers();
        return ResponseEntity.ok(users);
    }



}
