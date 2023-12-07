package com.example.backend.sevices.admin;

import com.example.backend.dto.*;
import com.example.backend.models.Task;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface AdminService {
    List<UserDto> getUsers();
    void updateUserById(Long id, ChangeUserDTO changeUserDTO);

    void userDeleteById(Long id);

    List<TaskDTO> getTasks();

    void addTask(TaskDTO taskDTO);

    void userTaskById(Long id);

    UpdateTaskDTO getTasksById(Long id);

    void updateTask(Long id, TaskDTO taskDTO);

    List<Task> getAllTasksId(Long id);

    List<OrderDTO> getAllOrders();


    Task completeTaskById(Long id);
}
