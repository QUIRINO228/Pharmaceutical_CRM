import { Component } from '@angular/core';
import {BasketService} from "../../basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
    totalCost: number = 0;

  items = this.basketService.getItems();

  constructor(
    private basketService: BasketService
  ) { }
    ngOnInit() {

        this.items = this.basketService.getItems();
        this.updateTotalCost();
    }
    clearBasket(): void {
        this.basketService.clearBasket();
        this.items = this.basketService.getItems();
    }
    private updateTotalCost(): void {
        this.totalCost = this.items.reduce((total, item) => total + (item.quantity || 0) * item.price, 0);
    }
}
