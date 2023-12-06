import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{


  constructor(private service: AppService) {

  }

  ngOnInit(): void {
    this.getAllTasks()

  }

  getAllTasks(){
    this.service.getAllTasks().subscribe(data =>{
      console.log(data)
    });
  }
}
