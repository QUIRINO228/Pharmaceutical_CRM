package com.example.backend.sevices.admin;

import com.example.backend.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {
    List<UserDto> getUsers();
}
