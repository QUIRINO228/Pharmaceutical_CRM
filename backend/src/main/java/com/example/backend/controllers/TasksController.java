package com.example.backend.controllers;

import com.example.backend.models.Task;
import com.example.backend.sevices.admin.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@AllArgsConstructor
public class TasksController {

    @Autowired
    private final AdminService adminService;

    @GetMapping("/my-tasks/{id}")
    private ResponseEntity<List<Task>> getALlTasksById(@PathVariable Long id) {
        List<Task> task = adminService.getAllTasksId(id);
        return ResponseEntity.ok(task);
    }
}
