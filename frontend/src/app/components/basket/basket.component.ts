import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {StorageService} from '../../services/storage/storage.service';
import {BasketItem} from "../../BasketItem";
import {Router} from "@angular/router";


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  items: BasketItem[] = [];
  totalCost: number = 0;

  constructor(
    private service: AppService,
    private storage: StorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getBasket();
  }

  getBasket() {
    const userId = StorageService.getUserId();
    this.service.getBasket(userId).subscribe(
      (data: any) => {
        console.log(data);
        if (data && Array.isArray(data) && data.length > 0 && data[0].product) {
          this.items = data.map((item: any) => ({ product: item.product, quantity: item.quantity }));
          this.calculateTotalCost();
        } else {

          console.error('Invalid data structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching basket:', error);

      }
    );
  }


  calculateTotalCost() {
    this.totalCost = this.items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + (item.quantity * price);
    }, 0);
  }

  clearBasket() {
    const userId = StorageService.getUserId();
    this.service.clearBasket(userId).subscribe(()=>{
      location.reload()
    },
      (error) =>{
        console.error('Error clearing basket:', error);
      })
  }

  createOrder() {
    this.router.navigateByUrl('create-order');
  }
}
