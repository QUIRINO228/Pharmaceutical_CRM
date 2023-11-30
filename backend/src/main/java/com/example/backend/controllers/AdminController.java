package com.example.backend.controllers;

import com.example.backend.dto.ChangeUserDTO;
import com.example.backend.dto.TaskDTO;
import com.example.backend.dto.UserDto;
import com.example.backend.models.Task;
import com.example.backend.sevices.admin.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    private ResponseEntity<List<UserDto>> getUsers() {
        List<UserDto> users = adminService.getUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<String> updateUserById(@PathVariable Long id, @RequestBody ChangeUserDTO changeUserDTO) {
        adminService.updateUserById(id, changeUserDTO);
        return ResponseEntity.ok("User updated successfully");
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<String> deleteUserByID(@PathVariable Long id) {
        adminService.userDeleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/tasks")
    private ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = adminService.getTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/task/{id}")
    private ResponseEntity<Optional<Task>> getTasksById(@PathVariable Long id) {
        Optional<Task> task = adminService.getTasksById(id);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/task/delete/{id}")
    public ResponseEntity<String> deleteTaskByID(@PathVariable Long id) {
        adminService.userTaskById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/task/add")
    private ResponseEntity<String> addTask(@RequestBody TaskDTO taskDTO) {
        adminService.addTask(taskDTO);
        return ResponseEntity.ok("Task added successfully");
    }

    @PutMapping("/task/update/{id}")
    private ResponseEntity<String> addTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        adminService.updateTask(id, taskDTO);
        return ResponseEntity.ok("Task added successfully");
    }
}
