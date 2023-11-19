package com.example.backend.sevices;

import com.example.backend.models.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ProductService {
    Product createProduct (Product product, MultipartFile photo);

    List<Product> getProducts();

    Product getProductById(Long id);

    void deleteProduct(Long id);

    Product updateProduct (Product product, Long id, MultipartFile photo);
}





