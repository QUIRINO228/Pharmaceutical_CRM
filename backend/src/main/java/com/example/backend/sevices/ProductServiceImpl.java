package com.example.backend.sevices;

import com.example.backend.models.Product;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.models.Image;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product, MultipartFile photo) {
        try {
            Image image = toImageEntity(photo);
            product.setPhoto(image.getBytes());
            productRepository.save(product);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return product;
    }

    @Override
    public List<Product> getProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product updateProduct(Product product, Long id, MultipartFile photo) {
        try {
            Image image = toImageEntity(photo);
            product.setPhoto(String.valueOf(image).getBytes());

            Product existingProduct = productRepository.findById(id).orElse(null);
            if (existingProduct != null) {
                existingProduct.setName(product.getName());
                existingProduct.setDescription(product.getDescription());
                existingProduct.setPrice(product.getPrice());
                existingProduct.setAvailability_quantity(product.getAvailability_quantity());
                existingProduct.setSupplier(product.getSupplier());
                existingProduct.setExpiration_date(product.getExpiration_date());

                productRepository.save(existingProduct);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return product;
    }

    private Image toImageEntity(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getName());
        image.setOriginalName(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setBytes(file.getBytes());
        return image;
    }
}