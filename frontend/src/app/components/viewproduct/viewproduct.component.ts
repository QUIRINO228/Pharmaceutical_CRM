import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductsComponent implements OnInit {

  products: any[] | undefined
  url: string = "http://localhost:8080/";

  constructor(private service: AppService, private router: Router) {

  }

  ngOnInit(): void {
    this.service.getProduct().subscribe(data => {
      this.products = data;
    })
  }

  deleteProduct(id: number){
    this.service.deleteProduct(id).subscribe(() => {
      this.products = this.products?.filter(product => product.id !== id);
    })

    setTimeout(()=>{
      window.location.reload();
    }, 100);

  }
  updateProduct(id: number){
    this.router.navigate(['update', id]);
  }

}
