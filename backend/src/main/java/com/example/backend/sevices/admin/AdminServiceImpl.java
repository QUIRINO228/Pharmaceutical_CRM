package com.example.backend.sevices.admin;

import com.example.backend.dto.*;
import com.example.backend.models.Task;
import com.example.backend.models.User;
import com.example.backend.models.enums.Role;
import com.example.backend.models.enums.TaskEnum;
import com.example.backend.repositories.TasksRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final TasksRepository tasksRepository;

    @PostConstruct
    public void createAdminAccount() {
        List<User> adminAccounts = userRepository.findByRole(Role.ADMIN);
        if (!adminAccounts.isEmpty()) {
            return;
        }
        User admin = new User();
        admin.setEmail("admin@gmail.com");
        admin.setIsActive(true);
        admin.setRole(Role.ADMIN);
        admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
        userRepository.save(admin);
    }

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(User::userDto).collect(Collectors.toList());
    }

    @Override
    public void updateUserById(Long id, ChangeUserDTO changeUserDTO) {
        User user = userRepository.findById(id).orElseThrow(null);
        if (user == null) return;
        user.setEmail(changeUserDTO.getEmail());
        user.setFirstName(changeUserDTO.getFirstName());
        user.setLastName(changeUserDTO.getLastName());
        user.setRole(changeUserDTO.getRole());
        userRepository.save(user);
    }

    @Override
    public void userDeleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<TaskDTO> getTasks() {
        List<Task> tasks = tasksRepository.findAll();

        return tasks.stream()
                .map(this::convertToTaskDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO convertToTaskDTO(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .header(task.getHeader())
                .description(task.getDescription())
                .email(task.getUser().getEmail())
                .taskStatus(task.getTaskEnum().toString())
                .user(new UserEmailRole(task.getUser().getEmail(), task.getUser().getRole()))
                .build();
    }

    @Override
    public void addTask(TaskDTO taskDTO) {
        log.info("taskDTO - {}", taskDTO);
        User user = userRepository.findByEmail(taskDTO.getEmail());
        Task task = new Task();
        task.setHeader(taskDTO.getHeader());
        task.setDescription(taskDTO.getDescription());
        task.setTaskEnum(TaskEnum.GIVEN);
        task.setUser(user);
        user.addTask(task);
        userRepository.save(user);
    }

    @Override
    public void userTaskById(Long id) {
        tasksRepository.deleteById(id);
    }

    @Override
    public UpdateTaskDTO getTasksById(Long id) {
        Optional<Task> taskOptional = tasksRepository.findById(id);
        Task task = taskOptional.get();
        return UpdateTaskDTO.builder()
                .header(task.getHeader())
                .description(task.getDescription())
                .taskStatus(task.getTaskEnum().toString())
                .build();
    }

    @Override
    public void updateTask(Long id, TaskDTO taskDTO) {
        log.info("taskDTO - {},  id -{}", taskDTO, id);
        Optional<Task> taskOptional = tasksRepository.findById(taskDTO.getId());
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            Optional<User> userOptional = userRepository.findById(task.getUser().getId());
            User user = userOptional.get();
            task.setHeader(taskDTO.getHeader());
            task.setDescription(taskDTO.getDescription());
            task.setUser(user);
            task.setTaskEnum(TaskEnum.getTaskEnum(taskDTO.getTaskStatus()));
            tasksRepository.save(task);
        }
    }

    @Override
    public List<Task> getAllTasksId(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        User user = userOptional.get();
        return user.getTasks();
    }
}
