package com.example.backend.controllers;

import com.example.backend.dto.AddToBasketRequest;
import com.example.backend.dto.BasketItemDTO;
import com.example.backend.models.BasketItem;
import com.example.backend.sevices.basket.BasketService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/basket/{id}")
    public ResponseEntity<List<BasketItemDTO>> getBasketById(@PathVariable Long id){
        return ResponseEntity.ok(basketService.getBasketById(id));
    }

    @DeleteMapping("/basket/delete/{id}")
    public ResponseEntity<String> deleteBasketById(@PathVariable Long id){
        basketService.deleteBasketById(id);
        return ResponseEntity.ok("Basket is clear");
    }
}
