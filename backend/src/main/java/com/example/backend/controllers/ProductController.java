package com.example.backend.controllers;


import com.example.backend.models.Product;
import com.example.backend.sevices.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public Product createProduct(@ModelAttribute Product product, @RequestParam("photo") MultipartFile photo) {
        Product product1 = productService.createProduct(product, photo);
        return product1;
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @PutMapping("/update/{id}")
    public Product updateProductById(@RequestBody Product product, @PathVariable Long id, @RequestParam("photo") MultipartFile photo) {
        return productService.updateProduct(product, id, photo);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully.";
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}