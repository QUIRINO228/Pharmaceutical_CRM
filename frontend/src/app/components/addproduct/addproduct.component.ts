import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  constructor(private service: AppService, private router: Router) { }
  data: any

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    availability_quantity: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    expiration_date: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
  }
  submit(){
    this.data = this.form.value
    this.service.addProduct(this.data).subscribe(data => {
    })
    this.router.navigate(['/product']);
  }

}
