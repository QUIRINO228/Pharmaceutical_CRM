package com.example.backend.controllers;


import com.example.backend.dto.ProductDTO;
import com.example.backend.models.Product;
import com.example.backend.sevices.product.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Slf4j
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @ExceptionHandler(value = MultipartException.class)
    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
    public ResponseEntity<Product> createProduct(
            @ModelAttribute("name") String name,
            @ModelAttribute("photoPath") String photoPath,
            @ModelAttribute("description") String description,
            @ModelAttribute("price") String price,
            @ModelAttribute("availability_quantity") String availability_quantity,
            @ModelAttribute("supplier") String supplier,
            @ModelAttribute("expiration_date") String expiration_date,
            @ModelAttribute("files") MultipartFile file
    ) throws IOException {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(name);
        productDTO.setDescription(description);
        productDTO.setPrice(new BigDecimal(price));
        productDTO.setAvailability_quantity(new BigDecimal(availability_quantity));
        productDTO.setSupplier(supplier);
        productDTO.setExpiration_date(expiration_date);
        Product product1 = productService.createProduct(productDTO, file);
        return ResponseEntity.ok(product1);
    }


    @GetMapping(value = "/products")
    @ResponseBody
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping(value = "/storage")
    @ResponseBody
    public List<ProductDTO> getProductsForStorage() {
        return productService.getProductsDTO();
    }

    @PutMapping("/update/{id}")
    public Product updateProductById(@ModelAttribute("name") String name,
                                     @ModelAttribute("photoPath") String photoPath,
                                     @ModelAttribute("description") String description,
                                     @ModelAttribute("price") String price,
                                     @ModelAttribute("availability_quantity") String availability_quantity,
                                     @ModelAttribute("supplier") String supplier,
                                     @ModelAttribute("expiration_date") String expiration_date,
                                     @ModelAttribute("files") MultipartFile file,
                                     @PathVariable Long id) throws IOException {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(name);
        productDTO.setDescription(description);
        productDTO.setPrice(new BigDecimal(price));
        productDTO.setAvailability_quantity(new BigDecimal(availability_quantity));
        productDTO.setSupplier(supplier);
        productDTO.setExpiration_date(expiration_date);
        return productService.updateProduct(productDTO, id, file);
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