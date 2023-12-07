import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";


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
  isMobile = false;

  addressDisplayedColumns: string[] = ['id', 'address', 'comment', 'createDate', 'completedDate', 'userEmail', 'status', 'actions'];


  constructor(private service: AppService,private breakpointObserver: BreakpointObserver,
  private router: Router) {}

  ngOnInit(): void {
    this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isMobile = result.matches;
        });
    this.getAllOrders();
      }

  getAllOrders() {
    this.service.getAllTasks().subscribe((data: Order[]) => {
      this.addressDataSource = data;
    });
  }

  orderInfo(id: number) {
    this.router.navigateByUrl('/order/'+id);
  }
}
