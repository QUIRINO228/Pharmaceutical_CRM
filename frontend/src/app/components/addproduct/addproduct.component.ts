import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ProductDTO } from "../../ProductDTO";

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
    constructor(private service: AppService, private router: Router) {}

    data: any;
    selectedFiles: File[] = [];

    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        photo: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        availability_quantity: new FormControl('', [Validators.required]),
        supplier: new FormControl('', [Validators.required]),
        expiration_date: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {}

    onFileChange(event: any) {
        if (event.target.files && event.target.files.length) {
            this.selectedFiles = event.target.files;
        }
    }

    onUploadFiles(): FormData {
        const formData = new FormData();
        for (const file of this.selectedFiles) {
            formData.append('files', file, file.name);
        }
        formData.forEach(console.log)
        return formData;
    }

    submit() {
        const formValue = this.form.value as FormDataFields;

        const productDTO: ProductDTO = {
            name: formValue.name ?? '',
            photoPath: this.selectedFiles[0].name,
            description: formValue.description ?? '',
            price: parseFloat(formValue.price ?? '0'),
            availability_quantity: parseInt(formValue.availability_quantity ?? '0'),
            supplier: formValue.supplier ?? '',
            expiration_date: formValue.expiration_date ?? ''
        };

        const formData = this.onUploadFiles();
        const productJSON = JSON.stringify(productDTO);


        formData.append('productDTO', productJSON);

        this.service.addProduct(formData).subscribe(
            data => {
                console.log('Response:', data);
            },
            error => {
                console.error('Error:', error);
            }
        );

        this.router.navigate(['/product']);
    }
}
