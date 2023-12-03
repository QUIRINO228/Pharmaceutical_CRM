import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../app.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
    productDataSource: any;
    productDisplayedColumns: string[] = ['id', 'name', 'description', 'price', 'availability_quantity', 'supplier', 'expiration_date', 'actions'];
    isEditing: boolean = false;
    editedItem: any;
    private form: FormGroup;
    products: any[] | undefined;

    constructor(private service: AppService, private router: Router, private snackBar: MatSnackBar) {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            availability_quantity: new FormControl('', Validators.required),
            supplier: new FormControl('', Validators.required),
            expiration_date: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(): void {
        this.service.getProductForStorage().subscribe(
            (products: any) => {
                this.productDataSource = new MatTableDataSource(products);
            },
            (error: any) => {
                console.error('Error loading products:', error);
                this.snackBar.open('Error loading products', 'Close', {duration: 2000});
            }
        );
    }

    editProduct(element: any): void {

    }


    deleteProduct(id: number): void {
        console.log(id);

    }


    addProduct() {

    }
}
