package com.example.backend.sevices.order;

import com.example.backend.dto.CreateOrderDTO;
import com.example.backend.dto.OrderDTO;
import com.example.backend.models.Basket;
import com.example.backend.models.BasketItem;
import com.example.backend.models.Order;
import com.example.backend.models.OrderItem;
import com.example.backend.models.enums.OrderEnum;
import com.example.backend.repositories.OrderItemRepository;
import com.example.backend.repositories.OrderRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.sevices.basket.BasketService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
        List<BasketItem> basketItems = basket.getBasketItems();
        Order order = Order.builder()
                .user(userRepository.findById(createOrderDTO.getUserId()).get())
                .address(createOrderDTO.getAddress())
                .comment(createOrderDTO.getComment())
                .status(OrderEnum.CREATED)
                .createDate(new Date())
                .build();
        List<OrderItem> orderItems = basketItems.stream()
                .map(basketItem -> OrderItem.builder()
                        .order(order)
                        .product(basketItem.getProduct())
                        .quantity(basketItem.getQuantity())
                        .build())
                .collect(Collectors.toList());
        orderItemRepository.saveAll(orderItems);
        order.setOrderItems(orderItems);
        orderRepository.save(order);
        return order;
    }

}
