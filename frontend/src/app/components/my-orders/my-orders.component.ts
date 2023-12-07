import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId = StorageService.getUserId()

  constructor(private service: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMyOrder();
  }

  getMyOrder() {
    this.service.getOrdersByUserId(this.userId).subscribe((data) => {
      console.log(data);
    });
  }
}

