package com.example.backend.dto;

import com.example.backend.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasketItemDTO {
    private Product product;
    private BigDecimal quantity;
}
