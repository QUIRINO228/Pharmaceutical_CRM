import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from "../../modules/admin/admin-service/admin.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {StorageService} from "../../services/storage/storage.service";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    orderId: number | undefined;
    order: any = {};
    totalCost: number | undefined;
    users: any[] = [];
    selectedUser: string = '';
    form: FormGroup;
    created = false
    private formBuilder: FormBuilder;

    isAdminLoggedIn: boolean = false;
    isUserLoggedIn: boolean = false;
    isManagerLoggedIn: boolean = false;
    private updateUserLoggedStatus(): void {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isUserLoggedIn = StorageService.isUserLoggedIn();
        this.isManagerLoggedIn = StorageService.isManagerLoggedIn();
    }

    constructor(
        private service: AppService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private adminService: AdminService,
        private router: Router,
        formBuilder: FormBuilder
    ) {
        this.formBuilder = formBuilder;
        this.form = this.formBuilder.group({
            user: [this.users[0], Validators.required],
        });
    }

    ngOnInit(): void {
        this.updateUserLoggedStatus();
        this.getOrder();
        this.loadUsers();
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
                    if (this.order.status == "CREATED")
                        this.created = false
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

    loadUsers() {
        this.adminService.getAllUsers().subscribe((users: any[]) => {
            this.users = users.filter(user => user.role === 'MANAGER');
            console.log(this.users)
        });
    }

    onUserSelected() {
        if (this.form.value.user && this.form.value.user.id) {
            this.selectedUser = this.form.value.user.id;
            console.log('Selected User:', this.selectedUser);
        }
    }


    onConfirm() {
        console.log(this.orderId, this.selectedUser);
        this.service.updateOrderUser(this.orderId, this.selectedUser).subscribe(
            (data: any) => {
                console.log('Order updated successfully:', data);
                this.router.navigate(['/orders']);
            },
            (error) => {
                this.router.navigate(['/orders']);
                console.error('Error updating order:', error);
            }
        );
    }

    onCancel() {
        this.service.cancelOrder(this.orderId).subscribe(
            (data: any) => {
                console.log('Order updated successfully:', data);
                this.router.navigate(['/orders']);
            },
            (error) => {
                this.router.navigate(['/orders']);
                console.error('Error updating order:', error);
            }
        );
    }

    onComplete() {
        this.service.completeOrder(this.orderId).subscribe(
            (data: any) => {
                console.log('Order updated successfully:', data);
                this.router.navigate(['/orders']);
            },
            (error) => {
                this.router.navigate(['/orders']);
                console.error('Error updating order:', error);
            }
        );
    }
}
