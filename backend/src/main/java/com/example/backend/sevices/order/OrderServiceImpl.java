package com.example.backend.sevices.order;

import com.example.backend.dto.CreateOrderDTO;
import com.example.backend.dto.OrderDTO;
import com.example.backend.models.*;
import com.example.backend.models.enums.OrderEnum;
import com.example.backend.repositories.OrderItemRepository;
import com.example.backend.repositories.OrderRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.sevices.basket.BasketService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final BasketService basketService;

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    @Override
    public Order createOrder(CreateOrderDTO createOrderDTO) {
        Basket basket = basketService.findBasketByUserId(createOrderDTO.getUserId());
        if (basket == null) {
            return null;
        }
        User user = userRepository.findById(createOrderDTO.getUserId()).get();
        List<BasketItem> basketItems = basket.getBasketItems();
        Order order = Order.builder()
                .user(user)
                .address(createOrderDTO.getAddress())
                .comment(createOrderDTO.getComment())
                .status(OrderEnum.CREATED)
                .createDate(LocalDate.now())
                .build();
        orderRepository.save(order);
        List<OrderItem> orderItems = basketItems.stream()
                .map(basketItem -> OrderItem.builder()
                        .order(order)
                        .product(basketItem.getProduct())
                        .quantity(basketItem.getQuantity())
                        .build())
                .collect(Collectors.toList());
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);
        }
        orderItemRepository.saveAll(orderItems);
        order.setOrderItems(orderItems);
        orderRepository.save(order);

        return order;
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId).get();
        List<Order> orders = user.getOrders();
        return orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id).get();
        return convertToOrderDTO(order);
    }

    private OrderDTO convertToOrderDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .address(order.getAddress())
                .comment(order.getComment())
                .createDate(order.getCreateDate())
                .completedDate(order.getCompletedDate())
                .userEmail(order.getUser().getEmail())
                .orderItems(order.getOrderItems())
                .status(order.getStatus())
                .build();
    }
}
