import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DomSanitizer } from "@angular/platform-browser";
import { StorageService } from "../../services/storage/storage.service";
import { Product } from "../../Product";


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductsComponent implements OnInit {
  products: Product[] = [];
  isManagerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;
  isWorkerLoggedIn: boolean = false;

  constructor(
      private service: AppService,
      private router: Router,
      private sanitizer: DomSanitizer,
      private route: ActivatedRoute,
  ) { }

  openAddProductDialog(): void {
    this.service.openAddProductDialog();
  }

  ngOnInit(): void {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedStatus();
      }
    });
    this.service.getProduct().subscribe(data => {
      console.log(data);
      this.products = data.map(product => {
        const imageUrl = product.image ? `http://localhost:8080/images/${product.image.id}` : '';
        const sanitizedImage = imageUrl ? this.sanitizer.bypassSecurityTrustUrl(imageUrl) : null;
        return {
          ...product,
          sanitizedImage: sanitizedImage
        };
      });
    });
  }

  addToBasket(product: Product): void {
    if (!this.isValidQuantity(product.quantity)) {
      alert('Invalid quantity');
      return;
    }
    const userId = StorageService.getUserId();
    const requestData = {
      productId: product.id,
      quantity: product.quantity,
      userId: userId
    };
    console.log(requestData);
    this.service.addToBasket(requestData).subscribe(data => {
      console.log(data);
    });
  }
  private isValidQuantity(quantity: any): boolean {
    return /^[0-9]+$/.test(quantity);
  }


  deleteProduct(id: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.service.deleteProduct(id).subscribe(() => {
        this.products = this.products?.filter(product => product.id !== id);
      });
    }
    location.reload();
  }

  updateProduct(id: number): void {
    this.router.navigate(['update', id]);
  }

  private updateUserLoggedStatus(): void {
    this.isManagerLoggedIn = StorageService.isManagerLoggedIn();
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
  }
  openUpdateProductDialog(id: number) {
    this.service.openUpdateProductDialog();
  }
}
