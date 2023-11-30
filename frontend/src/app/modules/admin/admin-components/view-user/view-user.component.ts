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
dColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'isActive', 'role'];
    dataSource = new MatTableDataSource<any>();
    isAdminLoggedIn: boolean = false;
    newRole: string | undefined; // Remove "private" to make it accessible in the template


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
