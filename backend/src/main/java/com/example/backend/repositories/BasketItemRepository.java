package com.example.backend.repositories;

import com.example.backend.models.Basket;
import com.example.backend.models.BasketItem;
import com.example.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BasketItemRepository extends JpaRepository<BasketItem, Long> {

    Optional<BasketItem> findByBasketAndProduct(Basket basket, Product product);

}
