import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderId: undefined | number;

  constructor(private service: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;

    this.service.getOrderById(this.orderId).subscribe((data) => {
      console.log(data);
    });
  }
}
