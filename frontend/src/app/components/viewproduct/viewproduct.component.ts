import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DomSanitizer } from "@angular/platform-browser";
import {CartService} from "../../cart.service";
import {Product} from "../../Product";


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductsComponent implements OnInit {

  products: any[] | undefined;


  constructor(private service: AppService, private router: Router, private sanitizer: DomSanitizer, private route: ActivatedRoute,
              private cartService: CartService) {}



  openAddProductDialog(): void {
    this.service.openAddProductDialog();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit(): void {
    this.service.getProduct().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      this.service.deleteProduct(id).subscribe(() => {
        this.products = this.products?.filter(product => product.id !== id);
      });
    }
  }

  updateProduct(id: number): void {
    this.router.navigate(['update', id]);
  }
}
