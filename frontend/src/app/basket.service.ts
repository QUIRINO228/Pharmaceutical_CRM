import { Injectable } from '@angular/core';
import {Product} from "./Product";


@Injectable({
  providedIn: 'root'
})

export class BasketService {

    constructor() {
        const storedItems = localStorage.getItem(this.basketKey);
        if (storedItems) {
            this.items = JSON.parse(storedItems);
        }

    }

  items: Product[] = [];

    private basketKey = 'userBasket';
  addToBasket(product: Product) {
    this.items.push(product);
      localStorage.setItem(this.basketKey, JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  clearBasket() {
    this.items = [];
    return this.items;
  }
}
