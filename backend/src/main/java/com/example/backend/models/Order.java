package com.example.backend.models;

import com.example.backend.models.enums.OrderEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ordrers")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate  createDate;
    private LocalDate completedDate;
    private String address;
    private String comment;
    private OrderEnum status;
    @JsonManagedReference
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<OrderItem> orderItems;
}


