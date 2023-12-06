import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from 'src/app/app.service';
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
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private service: AppService, private router: Router) {
  }

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
  currentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
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


  submit() {
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
    this.service.addProduct(formData).subscribe(
      data => {
        location.reload()
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
