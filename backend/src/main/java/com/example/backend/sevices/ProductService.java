package com.example.backend.sevices;

import com.example.backend.models.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    public Product createProduct (Product product);

    public List<Product> getProducts();

    public Product getProductById(long id);

    public void deleteProduct(long id);

    public Product updateProduct (Product product, long id);
}





