package com.example.backend.sevices.product;

import com.example.backend.dto.ProductDTO;
import com.example.backend.models.BasketItem;
import com.example.backend.models.Image;
import com.example.backend.models.Product;
import com.example.backend.repositories.ImageRepository;
import com.example.backend.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;



    @Override
    public Product createProduct(ProductDTO productDTO, MultipartFile file) throws IOException {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setAvailability_quantity(productDTO.getAvailability_quantity());
        product.setSupplier(productDTO.getSupplier());
        product.setExpiration_date(productDTO.getExpiration_date());
        if (file != null && file.getSize() > 0) {
            Image image = toImageEntity(file);
            product.addImageToProduct(image);
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
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        for (BasketItem basketItem : product.getBasketItems()) {
            basketItem.getBasket().getBasketItems().remove(basketItem);
            basketItem.setProduct(null);
            basketItem.setBasket(null);
        }
        productRepository.deleteById(id);
    }


    @Override
    public Product updateProduct(ProductDTO productDTO, Long id, MultipartFile file) throws IOException {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.setName(productDTO.getName());
            existingProduct.setDescription(productDTO.getDescription());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setAvailability_quantity(productDTO.getAvailability_quantity());
            existingProduct.setSupplier(productDTO.getSupplier());
            existingProduct.setExpiration_date(productDTO.getExpiration_date());
            if (file != null && file.getSize() > 0) {
                Image newImage = toImageEntity(file);
                Image oldImage = existingProduct.getImage();
                if (oldImage != null) {
                    existingProduct.removeImageFromProduct(oldImage);
                    imageRepository.delete(oldImage);
                }
                existingProduct.addImageToProduct(newImage);
            }

            productRepository.save(existingProduct);
        }
        return existingProduct;
    }

    @Override
    public List<ProductDTO> getProductsDTO() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product product : products) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setDescription(product.getDescription());
            productDTO.setPrice(product.getPrice());
            productDTO.setAvailability_quantity(product.getAvailability_quantity());
            productDTO.setSupplier(product.getSupplier());
            productDTO.setExpiration_date(product.getExpiration_date());
            productDTOS.add(productDTO);
        }
        return productDTOS;
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