package com.example.backend.sevices.basket;

import com.example.backend.dto.BasketItemDTO;
import com.example.backend.models.BasketItem;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface BasketService {
    void addProductToBasket(Long productId, BigDecimal quantity, Long userId);

    List<BasketItemDTO> getBasketById(Long id);

    void deleteBasketById(Long id);
}
