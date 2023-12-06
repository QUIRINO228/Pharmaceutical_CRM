import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";


interface Order {
  id: number;
  address: string;
  comment: string;
  createDate: string;
  completedDate: string;
  userEmail: string;
  status: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  addressDataSource: Order[] = [];

  addressDisplayedColumns: string[] = ['id', 'address', 'comment', 'createDate', 'completedDate', 'userEmail', 'status', 'actions'];


  constructor(private service: AppService,
  private router: Router) {}

  ngOnInit(): void {
    this.getAllOrders();
      }

  getAllOrders() {
    this.service.getAllTasks().subscribe((data: Order[]) => {
      this.addressDataSource = data;
    });
  }

  orderInfo(id: string) {
    this.router.navigateByUrl('/order/'+id);
  }
}
