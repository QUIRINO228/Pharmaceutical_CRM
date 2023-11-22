package com.example.backend.controllers;


import com.example.backend.dto.ProductDTO;
import com.example.backend.models.Product;
import com.example.backend.sevices.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping(value = "/add",  consumes =  {MediaType.MULTIPART_FORM_DATA_VALUE ,MediaType.APPLICATION_JSON_VALUE} )
    public String createProduct(
            @ModelAttribute("productDTO") ProductDTO productDTO,
            @ModelAttribute("files") List<MultipartFile> files
    ) throws IOException {

        log.info("Product - {},Files - {}", productDTO, files);
        Product product1 = productService.createProduct(productDTO, files);
        return "product";
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