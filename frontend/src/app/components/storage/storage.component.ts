import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../app.service';
import {MatTableDataSource} from '@angular/material/table';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

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
    isMobile = false;

    constructor(private service: AppService, private router: Router, private snackBar: MatSnackBar,private breakpointObserver: BreakpointObserver) {
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
        this.breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe(result => {
                // Update the isMobile variable based on the screen size
                this.isMobile = result.matches;
            });
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

  updateProduct(id: number): void {
    this.router.navigate(['update', id]);
  }



  deleteProduct(id: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.service.deleteProduct(id).subscribe(() => {
        this.products = this.products?.filter(product => product.id !== id);
        location.reload();
      });
    }
  }


  openAddProductDialog(): void {
    this.service.openAddProductDialog();
  }
}
