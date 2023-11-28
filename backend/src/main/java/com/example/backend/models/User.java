package com.example.backend.models;


import com.example.backend.models.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String email;

    private String firstName;

    private String lastName;

    private Role role;

    private String phone;

    private String password;

    private String activationLink;

    private Integer activationCode;

    private Boolean isActive;


}
