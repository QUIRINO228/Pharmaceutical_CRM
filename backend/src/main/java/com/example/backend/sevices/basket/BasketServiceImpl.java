package com.example.backend.sevices.basket;

import com.example.backend.dto.BasketItemDTO;
import com.example.backend.models.Basket;
import com.example.backend.models.BasketItem;
import com.example.backend.models.Product;
import com.example.backend.models.User;
import com.example.backend.repositories.BasketItemRepository;
import com.example.backend.repositories.BasketRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.sevices.product.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class BasketServiceImpl implements BasketService {

    private final BasketItemRepository basketItemRepository;
    private final ProductService productService;
    private final BasketRepository basketRepository;
    private final UserRepository userRepository;

    @Override
    public void addProductToBasket(Long productId, BigDecimal quantity, Long userId) {
        Basket basket = findBasketByUserId(userId);
        Product product = productService.getProductById(productId);
        BasketItem basketItem = basketItemRepository.findByBasketAndProduct(basket, product)
                .orElseGet(() -> {
                    BasketItem newItem = BasketItem.builder().basket(basket).product(product).build();
                    newItem.setQuantity(BigDecimal.ZERO);
                    return newItem;
                });
        if (basketItem.getQuantity() == null) {
            basketItem.setQuantity(BigDecimal.ZERO);
        }
        basketItem.setQuantity(basketItem.getQuantity().add(quantity));

        basketItemRepository.save(basketItem);
    }

    @Override
    public List<BasketItemDTO> getBasketById(Long id) {
        return Optional.ofNullable(findBasketByUserId(id))
                .map(basket -> basket.getBasketItems().stream()
                        .map(basketItem -> new BasketItemDTO(basketItem.getProduct(), basketItem.getQuantity()))
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    @Override
    public void deleteBasketById(Long id) {
        Basket basket = findBasketByUserId(id);
        List<BasketItem> basketItems = basket.getBasketItems();
        for (BasketItem basketItem : basketItems) {
            basketItemRepository.delete(basketItem);
            basketItem.setBasket(null);
        }

        basket.getBasketItems().clear();
        basketRepository.save(basket);
    }

    @Override
    public void removeProductFromBasket(Long userId, Long productId) {
        Basket basket = findBasketByUserId(userId);
        Product product = productService.getProductById(productId);

        basketItemRepository.findByBasketAndProduct(basket, product).ifPresent(basketItem -> {
            basketItemRepository.delete(basketItem);
            basketItem.setBasket(null);
        });
    }

    @Override
    public Basket findBasketByUserId(Long userId) {
        Optional<Basket> optionalBasket = basketRepository.findByUserId(userId);
        return optionalBasket.orElseGet(() -> {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return null;
            }
            Basket newBasket = Basket.builder().user(user).build();
            return basketRepository.save(newBasket);
        });
    }


}
