import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "../../cart.service";
import { Product } from "../../Product";
import { StorageService } from "../../services/storage/storage.service";

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductsComponent implements OnInit {

  products: any[] | undefined;
  isManagerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  constructor(
    private service: AppService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  openAddProductDialog(): void {
    this.service.openAddProductDialog();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit(): void {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedStatus();
      }
    })
    this.service.getProduct().subscribe(data => {
      console.log(data)
      this.products = data.map(product => {
        const imageUrl = product.images.length > 0 ? `http://localhost:8080/images/${product.images[0].id}` : '';
        const sanitizedImage = imageUrl ? this.sanitizer.bypassSecurityTrustUrl(imageUrl) : null;
        return {
          ...product,
          sanitizedImage: sanitizedImage
        };
      });
    });
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
    this.isManagerLoggedIn = StorageService.isManagerLoggedIn()
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn()
  }
}
