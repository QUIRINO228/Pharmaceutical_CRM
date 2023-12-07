package com.example.backend.sevices.order;

import com.example.backend.dto.CreateOrderDTO;
import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.TaskDTO;
import com.example.backend.models.*;
import com.example.backend.models.enums.OrderEnum;
import com.example.backend.models.enums.TaskEnum;
import com.example.backend.repositories.*;
import com.example.backend.sevices.basket.BasketService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final BasketService basketService;

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final TasksRepository tasksRepository;

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

    @Override
    public void cancelOrder(Long id) {
        log.info("{}", id);
        Order order = orderRepository.findById(id).get();
        order.setStatus(OrderEnum.CANCEL);
        orderRepository.save(order);
    }

    @Override
    public void confirmOrder(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId).get();
        List<OrderItem> orderItems = order.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            product.setAvailability_quantity(product.getAvailability_quantity().subtract(orderItem.getQuantity()));
            productRepository.save(product);
        }
        addTask(userId, orderId);
        order.setStatus(OrderEnum.WAITING_PAYMENT);
        orderRepository.save(order);
    }

    @Override
    public void completeOrder(Long id) {
        Order order = orderRepository.findById(id).get();
        order.setStatus(OrderEnum.COMPLETED);
        orderRepository.save(order);
    }


    public void addTask(Long userId, Long orderId) {
        User user = userRepository.findById(userId).get();
        Task task = new Task();
        task.setHeader("Complete the order");
        task.setDescription("Complete the order with id "+ orderId);
        task.setTaskEnum(TaskEnum.GIVEN);
        task.setUser(user);
        user.addTask(task);
        userRepository.save(user);
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
