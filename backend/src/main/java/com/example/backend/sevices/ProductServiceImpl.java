package com.example.backend.sevices;

import com.example.backend.models.Product;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    @Override
    public List<Product> getProducts() {
        return (List<Product>) productRepository.findAll();
    }
    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).get();
    }
    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);

    }
    @Override
    public Product updateProduct(Product product, Long id) {
        Product product1 = productRepository.findById(id).get();
        product1.setName(product.getName());
        product1.setPhoto(product.getPhoto());
        product1.setDescription(product.getDescription());
        product1.setPrice(product.getPrice());
        product1.setAvailability_quantity(product.getAvailability_quantity());
        product1.setSupplier(product.getSupplier());
        product1.setExpiration_date(product.getExpiration_date());
        return productRepository.save(product1);
    }
}
