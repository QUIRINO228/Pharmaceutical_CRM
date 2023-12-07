package com.example.backend.sevices.order;

import com.example.backend.dto.CreateOrderDTO;
import com.example.backend.dto.OrderDTO;
import com.example.backend.models.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    Order createOrder(CreateOrderDTO createOrderDTO);

    List<OrderDTO> getOrdersByUserId(Long userId);

    OrderDTO getOrderById(Long id);

    void cancelOrder(Long id);

    void confirmOrder(Long orderId, Long userId);

    void completeOrder(Long id);
}
