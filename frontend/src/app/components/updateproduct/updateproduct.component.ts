import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from 'src/app/app.service';
import {Product} from 'src/app/Product';
import {ProductDTO} from "../../ProductDTO";

interface FormDataFields {
  name?: string | null;
  description?: string | null;
  price?: string | null;
  availability_quantity?: string | null;
  supplier?: string | null;
  expiration_date?: string | null;

  [key: string]: string | null | undefined;
}

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  product?: Product
  data: any;
  selectedFile: File | undefined;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    photo: new FormControl([], [Validators.required]),
    price: new FormControl('', [Validators.required]),
    availability_quantity: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    expiration_date: new FormControl('', [Validators.required]),
  });

  constructor(private service: AppService, private route: ActivatedRoute, private router : Router) { }

  currentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.service.getProductById(id).subscribe(data => {
      this.product = data
      this.form.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price.toString(), // Convert to string if necessary
        availability_quantity: this.product.availability_quantity.toString(),
        supplier: this.product.supplier,
        expiration_date: this.product.expiration_date.toString(),
      });

    })
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  onUploadFiles(): FormData {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    return formData;
  }

  submit(){
    const id = this.route.snapshot.params['id'];
    const formValue = this.form.value as FormDataFields;

    const productDTO: ProductDTO = {
      name: formValue.name ?? '',
      description: formValue.description ?? '',
      price: parseFloat(formValue.price ?? '0'),
      availability_quantity: parseInt(formValue.availability_quantity ?? '0'),
      supplier: formValue.supplier ?? '',
      expiration_date: formValue.expiration_date ?? ''
    };

    const formData = this.onUploadFiles();

    formData.append('name', productDTO.name);
    formData.append('description', productDTO.description);
    formData.append('price', String(productDTO.price));
    formData.append('availability_quantity',  String(productDTO.availability_quantity));
    formData.append('supplier', productDTO.supplier);
    formData.append('expiration_date', productDTO.expiration_date);
    this.service.updateProduct(id, formData).subscribe(data => {
    })
    setTimeout(() => {

    }, 300);
    this.router.navigate(['/products']);
  }
}

