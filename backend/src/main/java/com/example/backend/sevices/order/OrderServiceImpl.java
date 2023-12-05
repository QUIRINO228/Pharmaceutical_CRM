package com.example.backend.sevices.order;

import com.example.backend.dto.OrderDTO;
import com.example.backend.models.Basket;
import com.example.backend.models.BasketItem;
import com.example.backend.models.Order;
import com.example.backend.models.OrderItem;
import com.example.backend.repositories.OrderItemRepository;
import com.example.backend.repositories.OrderRepository;
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
    @Override
    public Order createOrder(OrderDTO orderDTO) {
        Basket basket = basketService.findBasketByUserId(orderDTO.getUserId());
        if (basket == null) {
            return null;
        }
        List<BasketItem> basketItems = basket.getBasketItems();
        basketItems.forEach(item -> {
            System.out.println("Basket Item: " + item.getProduct().getName() + ", Quantity: " + item.getQuantity());
        });

        Order order = Order.builder()
                .address(orderDTO.getAddress())
                .comment(orderDTO.getComment())
                .createDate(new Date())
                .build();

        List<OrderItem> orderItems = basketItems.stream()
                .map(basketItem -> OrderItem.builder()
                        .order(order)
                        .product(basketItem.getProduct())
                        .quantity(basketItem.getQuantity())
                        .build())
                .collect(Collectors.toList());

        orderItems.forEach(item -> {
            System.out.println("Order Item: " + item.getProduct().getName() + ", Quantity: " + item.getQuantity());
        });
        orderItemRepository.saveAll(orderItems);
        order.setOrderItems(orderItems);
        orderRepository.save(order);
        System.out.println("Order saved with ID: " + order.getId());

        return order;
    }

}
