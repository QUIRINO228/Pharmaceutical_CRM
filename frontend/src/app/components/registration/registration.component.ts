import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  registrationSuccess: boolean = false;
  registrationError: string = '';
  constructor(private fb: FormBuilder, private appService: AppService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      this.appService.registerUser(user).subscribe(
        () => {

          this.registrationSuccess = true;
          this.registrationError = ''; // Reset any previous error
        },
        (error) => {

          this.registrationSuccess = false;
          this.registrationError = 'Registration failed. Please try again.'; // Set an error message
        }
      );
    }
  }
}
