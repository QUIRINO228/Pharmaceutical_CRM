import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {StorageService} from '../../services/storage/storage.service';
import {BasketItem} from "../../BasketItem";
import {Router} from "@angular/router";
import { Product } from "../../Product";
import {DomSanitizer} from "@angular/platform-browser";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  items: BasketItem[] = [];
  totalCost: number = 0;
  products: Product[] = [];
    isMobile = false;

  constructor(
    private service: AppService,
    private storage: StorageService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
      this.breakpointObserver
          .observe([Breakpoints.Handset])
          .subscribe(result => {
              // Update the isMobile variable based on the screen size
              this.isMobile = result.matches;
          });
    this.getBasket();
  }

    getBasket() {
        const userId = StorageService.getUserId();
        this.service.getBasket(userId).subscribe(
            (data: any) => {
                console.log(data);
                if (data && Array.isArray(data) && data.length > 0 && data[0].product) {
                    this.items = data.map((item: any) => {
                        const product = item.product;
                        const imageUrl = product.image ? `http://localhost:8080/images/${product.image.id}` : '';
                        const sanitizedImage = imageUrl ? this.sanitizer.bypassSecurityTrustUrl(imageUrl) : null;
                        return {
                            ...item,
                            product: {
                                ...product,
                                sanitizedImage: sanitizedImage
                            }
                        };
                    });
                    this.calculateTotalCost();
                } else {
                    console.error('Invalid data structure:', data);
                }
            },
            (error) => {
                console.error('Error fetching basket:', error);
            }
        );
    }



  calculateTotalCost() {
    this.totalCost = this.items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + (item.quantity * price);
    }, 0);
  }

    removeFromBasket(item: BasketItem): void {
        console.log('Removing from basket:', item);
        const userId = StorageService.getUserId();
        this.service.removeFromBasket(userId, item.product.id).subscribe(() => {
            console.log('Item removed from basket successfully');
        });
    }

    clearBasket(): void {
        console.log('Clearing basket');
        const userId = StorageService.getUserId();
        this.service.clearBasket(userId).subscribe(() => {
            console.log('Basket cleared successfully');
        });
    }
  createOrder() {
    this.router.navigateByUrl('create-order');
  }

    updateTotalCost() {
        this.calculateTotalCost();
    }
}
