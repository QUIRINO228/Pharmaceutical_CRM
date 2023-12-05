import { OrderDTO } from "../../OrderDTO";
import { StorageService } from "../../services/storage/storage.service";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../app.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: AppService) {
    this.form = this.fb.group({
      address: ['', Validators.required],
      comment: ['', Validators.required],
      userId: [StorageService.getUserId()]
    });
  }

  submit() {
    if (this.form.valid) {
      const orderDTO: OrderDTO = this.form.value;

      console.log(orderDTO);

      this.service.createOrder(orderDTO).subscribe(
        (response: any) => {
          console.log('Order created successfully', response);
          // You can handle the success response here
        },
        (error) => {
          console.error('Error creating order', error);
          // Handle the error appropriately
        });
    }

      this.service.clearBasket(StorageService.getUserId()).subscribe(()=>{
          location.reload()
        },
        (error) =>{
          console.error('Error clearing basket:', error);
        })
  }

}
