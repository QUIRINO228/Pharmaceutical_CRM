import {OrderDTO} from "../../OrderDTO";
import {StorageService} from "../../services/storage/storage.service";
import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: AppService,
              private router: Router) {
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
          this.service.clearBasket(StorageService.getUserId()).subscribe(() => {

            },
            (error) => {
              console.error('Error clearing basket:', error);
              this.router.navigateByUrl('/my-orders');
            })
        },
        (error) => {
          console.error('Error creating order', error);
          // Handle the error appropriately
        });
    }


  }

}
