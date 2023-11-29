package com.example.backend.sevices.product;

import com.example.backend.dto.ProductDTO;
import com.example.backend.models.Image;
import com.example.backend.models.Product;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product createProduct(ProductDTO productDTO, List<MultipartFile> files) throws IOException {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setAvailability_quantity(productDTO.getAvailability_quantity());
        product.setSupplier(productDTO.getSupplier());
        product.setExpiration_date(productDTO.getExpiration_date());

        for (MultipartFile file : files) {
            if (file != null && file.getSize() > 0) {
                Image image = toImageEntity(file);
                image.setPreviewImage(true);
                product.addImageToProduct(image);
            }
        }

        productRepository.save(product);
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
    public Product updateProduct(ProductDTO productDTO, Long id, List<MultipartFile> files) {
        try {
            Product existingProduct = productRepository.findById(id).orElse(null);
            if (existingProduct != null) {
                existingProduct.setName(productDTO.getName());
                existingProduct.setDescription(productDTO.getDescription());
                existingProduct.setPrice(productDTO.getPrice());
                existingProduct.setAvailability_quantity(productDTO.getAvailability_quantity());
                existingProduct.setSupplier(productDTO.getSupplier());
                existingProduct.setExpiration_date(productDTO.getExpiration_date());
                existingProduct.getImages().clear();
                for (MultipartFile file : files) {
                    if (file != null && file.getSize() > 0) {
                        Image image = toImageEntity(file);
                        image.setPreviewImage(true);
                        existingProduct.addImageToProduct(image);
                    }
                }
                productRepository.save(existingProduct);
            }
            return existingProduct;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update product", e);
        }
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