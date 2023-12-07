package com.example.backend.controllers;

import com.example.backend.models.Task;
import com.example.backend.sevices.admin.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class TasksController {


    private final AdminService adminService;

    @GetMapping("/my-tasks/{id}")
    private ResponseEntity<List<Task>> getALlTasksById(@PathVariable Long id) {
        List<Task> task = adminService.getAllTasksId(id);
        return ResponseEntity.ok(task);
    }

    @PostMapping("/complete")
    private ResponseEntity<String> completeTaskById(@RequestBody Long id) {
        Task task = adminService.completeTaskById(id);
        return ResponseEntity.ok("Task complete");
    }

}
