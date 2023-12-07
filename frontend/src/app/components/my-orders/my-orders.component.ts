import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";
import {BasketItem} from "../../BasketItem";

interface Order {
  id: number;
  userId: string;
  address: string;
  comment: string;
  createDate: string;
}

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId = StorageService.getUserId()
  myOrders: Order[] = [];
  items: BasketItem[] = [];

  constructor(private service: AppService, private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    this.getMyOrder();
  }

  getMyOrder() {
    // @ts-ignore
    this.service.getOrdersByUserId(this.userId).subscribe((data: Order[]) => {
      this.myOrders = data;
    });
  }
  orderInfom(id: number) {
    this.router.navigateByUrl('/basket/'+id);
  }

}

