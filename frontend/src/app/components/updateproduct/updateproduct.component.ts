import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/Product';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  product?: Product
  data: any


  constructor(private service: AppService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.service.getProductById(id).subscribe(data => {
      this.product = data
    })
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    availability_quantity: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    expiration_date: new FormControl('', [Validators.required]),
  })

  submit(){
    this.data = this.form.value

    this.service.updateProduct(this.product?.id, this.data).subscribe(data => {
    })
    setTimeout(() => {

    }, 300);
    this.router.navigate(['/product']);
  }
}
