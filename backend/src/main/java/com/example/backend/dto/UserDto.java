package com.example.backend.dto;

import com.example.backend.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String email;

    private String firstName;

    private String lastName;

    private Role role;

    private Boolean isActive;
}
