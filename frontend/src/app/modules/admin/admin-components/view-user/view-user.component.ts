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
    displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'isActive', 'role', 'actions'];
    dataSource = new MatTableDataSource<any>();
    isAdminLoggedIn: boolean = false;
    newRole: string | undefined;
    element: any;
    isEditing: boolean = false;
    editedItem: any;
    roles: string[] = ['ADMIN', 'MANAGER', 'USER', 'WORKER'];
    constructor(private service: AdminService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.getAllUsers();
    }


    editItem(element: any) {
        this.isEditing = true;
        this.editedItem = { ...element };
    }

    getAllUsers() {
        this.service.getAllUsers().subscribe((res) => {
            this.dataSource.data = res;
        });
    }

    saveChanges() {
        const newData = {
            email: this.editedItem.email,
            firstName: this.editedItem.firstName,
            lastName: this.editedItem.lastName,
            role: this.editedItem.role,
        };

        this.service.updateUser(this.editedItem.id, newData).subscribe(
            (response: any) => {
                console.log('Response from server:', response);
                this.snackBar.open('Changes saved successfully', 'Close', { duration: 2000 });
                this.getAllUsers();
                this.isEditing = false;
                this.editedItem = null;
            },
            (error: any) => {
                location.reload()
            }
        );
    }



    deleteItem(element: any) {
        const confirmation = confirm('Are you sure you want to delete this item?');
        if (confirmation) {
            this.service.deleteUser(element.id).subscribe(
                (response: any) => {
                    console.log('Response from server:', response);
                    this.snackBar.open(response, 'Close', { duration: 2000 });
                    this.getAllUsers();
                },
                (error: any) => {
                    location.reload()
                }
            );
        }
    }

    cancelEdit() {
        this.isEditing = false;
        this.editedItem = null;
    }
}
