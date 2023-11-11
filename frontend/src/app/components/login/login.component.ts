import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value
      this.appService.login(user).subscribe(
          (response) => {
            console.log('Login response:', response);
            this.router.navigate(['/product']);
          },
          (error) => {
            console.error('Login error:', error);
            this.loginError = 'Login failed. Please check your credentials.';
          }
      );
    }
  }
}
