import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from "../../app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  registrationSuccess: boolean = false;
  registrationError: string = '';

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {
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
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.registrationSuccess = false;
          this.registrationError = 'Registration failed. Please try again.';
        }
      );
    }
  }
}
