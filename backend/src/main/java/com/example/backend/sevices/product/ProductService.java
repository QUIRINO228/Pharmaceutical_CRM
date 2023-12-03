package com.example.backend.sevices.product;

import com.example.backend.dto.ProductDTO;
import com.example.backend.models.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface ProductService {

    Product createProduct(ProductDTO productDTO, MultipartFile file) throws IOException;

    List<Product> getProducts();

    Product getProductById(Long id);

    void deleteProduct(Long id);

    Product updateProduct (ProductDTO productDTO, Long id,  MultipartFile file) throws IOException;

    List<ProductDTO> getProductsDTO();
}





