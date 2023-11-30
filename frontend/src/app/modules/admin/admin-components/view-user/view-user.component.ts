import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
    displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'isActive', 'role'];
    dataSource = new MatTableDataSource<any>();
    isAdminLoggedIn: boolean = false;
    newRole: string | undefined; // Remove "private" to make it accessible in the template

    constructor(private service: AdminService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.getAllUsers();
    }

    changeRole(user: any) {
        this.service.changeUserRole(user.id, this.newRole).subscribe(
            () => {
                this.snackBar.open('Role changed successfully', 'Close', { duration: 2000 });
                this.getAllUsers();
            },
            (error: any) => {
                console.error('Error changing role:', error);
                this.snackBar.open('Error changing role', 'Close', { duration: 2000 });
            }
        );
    }

    getAllUsers() {
        this.service.getAllUsers().subscribe((res) => {
            this.dataSource.data = res;
        });
    }
}
