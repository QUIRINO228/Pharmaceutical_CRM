import { Component } from '@angular/core';
import {AdminService} from "../../admin-service/admin.service";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  constructor(private service: AdminService) {}

  ngOnInit(){
    this.getAllUsers()
  }
  getAllUsers(){
    this.service.getAllUsers().subscribe((res) => {
      console.log(res)
    })
  }

}
