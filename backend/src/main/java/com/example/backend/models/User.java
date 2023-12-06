package com.example.backend.models;


import com.example.backend.dto.UserDto;
import com.example.backend.models.enums.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


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
    private String password;
    private String activationLink;
    private Integer activationCode;
    private String forgotLink;
    private Integer forgotCode;
    private Boolean isActive;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    private List<Task> tasks;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY,
            mappedBy = "user")
    private Basket basket;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    private List<Order> orders;
    public UserDto userDto(){
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setEmail(email);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setRole(role);
        userDto.setIsActive(isActive);
        return userDto;
    }

    public void addTask(Task task){
        this.tasks.add(task);
    }

}
