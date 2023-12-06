package com.example.backend.dto;

import com.example.backend.models.OrderItem;
import com.example.backend.models.User;
import com.example.backend.models.enums.OrderEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long userId;
    private String address;
    private String comment;
    private Date createDate;
    private Date completedDate;
    private OrderEnum status;
    private String userEmail;
    private List<OrderItem> orderItems;
}
