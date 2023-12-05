package com.example.backend.controllers;

import com.example.backend.dto.OrderDTO;
import com.example.backend.models.Order;
import com.example.backend.sevices.order.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create-order")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO) {
        log.info("Received OrderDTO: {}", orderDTO);
        Order order = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(order);
    }
}