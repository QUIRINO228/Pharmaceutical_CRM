package com.example.backend.controllers;

import com.example.backend.dto.AddToBasketRequest;
import com.example.backend.sevices.basket.BasketService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Slf4j
public class BasketController {

    private final BasketService basketService;


    @PostMapping("/addToBasket")
    public ResponseEntity<String> addToBasket(@RequestBody AddToBasketRequest request) {
        log.info("{}", request);
        basketService.addProductToBasket(request.getProductId(), request.getQuantity(), request.getUserId());
        return ResponseEntity.ok("Product added to the basket successfully.");
    }
}
