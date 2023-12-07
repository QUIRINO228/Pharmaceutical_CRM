import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderId: number | undefined;
  order: any = {};  // Declare order object to store the fetched order
  totalCost: number | undefined;

  constructor(
    private service: AppService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.service.getOrderById(this.orderId).subscribe(
      (data: any) => {
        console.log('Fetched order:', data);
        if (data) {
          const orderTotal = data.orderItems.reduce(
            (sum: number, item: any) => {
              const price = item.product?.price || 0;
              return sum + item.quantity * price;
            },
            0
          );

          this.order = {
            ...data,
            totalCost: orderTotal,
            orderItems: data.orderItems.map((orderItem: any) => {
              const product = orderItem.product;
              const imageUrl = product.image
                ? `http://localhost:8080/images/${product.image.id}`
                : '';
              const sanitizedImage = imageUrl
                ? this.sanitizer.bypassSecurityTrustUrl(imageUrl)
                : null;
              return {
                ...orderItem,
                product: {
                  ...product,
                  sanitizedImage: sanitizedImage,
                },
              };
            }),
          };

          this.totalCost = orderTotal;
        } else {
          console.error('Invalid data structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
  }
}
