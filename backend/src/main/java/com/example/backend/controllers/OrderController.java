package com.example.backend.controllers;

import com.example.backend.dto.CreateOrderDTO;
import com.example.backend.dto.OrderDTO;
import com.example.backend.models.Order;
import com.example.backend.sevices.admin.AdminService;
import com.example.backend.sevices.order.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;


    @PostMapping("/create-order")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderDTO createOrderDTO) {
        Order order = orderService.createOrder(createOrderDTO);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        OrderDTO order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable Long id) {
        List<OrderDTO> orders = orderService.getOrdersByUserId(id);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/cancel")
    public ResponseEntity<String> cancelOrder(@RequestBody Long id) {
        orderService.cancelOrder(id);
        return ResponseEntity.ok("Order was canceled");
    }

    @PostMapping("/confirm/{orderId}")
    public ResponseEntity<String> confirmOrder(@PathVariable Long orderId, @RequestBody Long userId) {
        orderService.confirmOrder(orderId,userId);
        return ResponseEntity.ok("Order was canceled");
    }

    @PostMapping("/complete-order")
    public ResponseEntity<String> completeOrder(@RequestBody Long id) {
        orderService.completeOrder(id);
        return ResponseEntity.ok("Order was complete");
    }
}
