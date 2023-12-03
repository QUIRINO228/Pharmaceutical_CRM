package com.example.backend.sevices.basket;

import com.example.backend.models.Basket;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public interface BasketService {
    void addProductToBasket(Long productId, BigDecimal quantity, Long userId);

}
