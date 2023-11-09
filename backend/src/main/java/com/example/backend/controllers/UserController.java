package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.sevices.UserService;
import lombok.AllArgsConstructor;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
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
    public String login(Model model) {
        return "redirect:/main";
    }


    @GetMapping("/registration")
    public String registration() {
        return "registration";
    }


    @PostMapping("/registration")
    public String createUser(@RequestBody User user) {
        if (userService.createUser(user)) {
            return "redirect:/login";
        } else {
            return "registration";
        }
    }
}
