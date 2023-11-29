import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../admin-service/admin.service";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'isActive', 'role'];
  dataSource = new MatTableDataSource<any>();
  isAdminLoggedIn: boolean = false;
  constructor(private service: AdminService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe((res) => {
      this.dataSource.data = res;
    });
  }
}
