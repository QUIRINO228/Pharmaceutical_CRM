package com.example.backend.sevices.admin;

import com.example.backend.dto.ChangeUserDTO;
import com.example.backend.dto.TaskDTO;
import com.example.backend.dto.UserDto;
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
    public List<Task> getTasks() {
        return tasksRepository.findAll();
    }

    @Override
    public void addTask(TaskDTO taskDTO) {
        log.info("taskDTO - {}",taskDTO);
        User user = userRepository.findByEmail(taskDTO.getEmail());
        Task task = new Task();
        task.setHeader(taskDTO.getHeader());
        task.setDescription(taskDTO.getDescription());
        task.setTaskEnum(TaskEnum.GIVEN);
        tasksRepository.save(task);
    }

    @Override
    public void userTaskById(Long id) {
        tasksRepository.deleteById(id);
    }

    @Override
    public Optional<Task> getTasksById(Long id) {
        return tasksRepository.findById(id);
    }

    @Override
    public void updateTask(Long id, TaskDTO taskDTO) {
        log.info("taskDTO - {},  id -{}",taskDTO, id);
        Optional<Task> taskOptional = tasksRepository.findById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();

            User user = userRepository.findByEmail(taskDTO.getEmail());
            if (user != null) {
                task.setHeader(taskDTO.getHeader());
                task.setDescription(taskDTO.getDescription());
                task.setUser(user);
                task.setTaskEnum(TaskEnum.getTaskEnum(taskDTO.getTaskStatus()));
                tasksRepository.save(task);
            }
        }
    }

    @Override
    public List<Task> getAllTasksId(Long id) {
        Optional<Task> tasks = tasksRepository.findById(id);
        return tasks.stream().toList();
    }
}
