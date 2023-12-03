package com.example.backend.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal availability_quantity;
    private String supplier;
    private String expiration_date;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY,
            mappedBy = "product")
    @JsonManagedReference
    private Image image;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BasketItem> basketItems = new ArrayList<>();

    public void addImageToProduct(Image image) {
        image.setProduct(this);
        this.setImage(image);
    }

    public void removeImageFromProduct(Image image) {
        this.setImage(null);
        image.setProduct(null);
    }
}
