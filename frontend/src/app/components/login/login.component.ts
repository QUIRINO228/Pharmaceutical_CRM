import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { StorageService } from '../../auth/services/storage/storage.service';

import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar from the correct path

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private snackbar: MatSnackBar // Inject MatSnackBar here
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getPhotoPath(photoNumber: number): string {
    return `/assets/images/photo${photoNumber}.jpg`;
  }

  goToAnotherPage() {
    this.router.navigate(['/registration']);
  }

  onSubmit() {
    console.log(this.loginForm.value);

    this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get('password')!.value
    ).subscribe(
      (response) => {
        console.log(response);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin/dashboard');
        } else if (StorageService.isWorkerLoggedIn()) {
          this.router.navigateByUrl('worker/dashboard');
        }
      },
      (error) => {
        if (error.status == 406) {
          this.snackbar.open('User is not active', 'Close', {
            duration: 5000
          });
        } else {
          this.snackbar.open('Bad credentials', 'Close', {
            duration: 5000
          });
        }
      }
    );
  }


}
