package com.example.backend.sevices.order;

import com.example.backend.dto.OrderDTO;
import com.example.backend.models.Order;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {

    Order createOrder(OrderDTO orderDTO);
}
