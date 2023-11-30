import { Component } from '@angular/core';
import {CartService} from "../cart.service";
import {AuthService} from "../services/auth/auth.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  items = this.cartService.getItems();
  constructor(
    private cartService: CartService, private authService: AuthService
  ) { }

  calculateTotalCost(): number {

    return this.items.reduce((total, item) => total + item.price, 0);
  }
  confirmPurchase(): void {

    console.log('Purchase confirmed!');
  }
}
