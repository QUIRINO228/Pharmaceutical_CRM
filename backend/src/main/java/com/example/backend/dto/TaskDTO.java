package com.example.backend.dto;


import com.example.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private Long id;
    private String header;
    private String description;
    private String email;
    private String taskStatus;
    private UserEmailRole user;
}
