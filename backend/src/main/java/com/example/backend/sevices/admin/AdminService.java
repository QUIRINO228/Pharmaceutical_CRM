package com.example.backend.sevices.admin;

import com.example.backend.dto.ChangeUserDTO;
import com.example.backend.dto.TaskDTO;
import com.example.backend.dto.UserDto;
import com.example.backend.models.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface AdminService {
    List<UserDto> getUsers();
    void updateUserById(Long id, ChangeUserDTO changeUserDTO);

    void userDeleteById(Long id);

    List<Task> getTasks();

    void addTask(TaskDTO taskDTO);

    void userTaskById(Long id);

    Optional<Task> getTasksById(Long id);

    void updateTask(Long id, TaskDTO taskDTO);
}
