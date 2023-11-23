import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductsComponent implements OnInit {

  products: any[] | undefined;
  url: string = "http://localhost:8080";

  constructor(private service: AppService, private router: Router, private sanitizer: DomSanitizer) {}



  ngOnInit(): void {
    this.service.getProduct().subscribe(data => {
      this.products = data;
    });
  }



  deleteProduct(id: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      this.service.deleteProduct(id).subscribe(() => {
        // Remove the deleted product from the local array
        this.products = this.products?.filter(product => product.id !== id);
      });
    }
  }

  updateProduct(id: number): void {
    this.router.navigate(['update', id]);
  }
}
