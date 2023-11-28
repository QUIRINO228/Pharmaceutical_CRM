import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {StorageService} from '../../services/storage/storage.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {AppService} from "../../app.service"; // Import MatSnackBar from the correct path

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private appService: AppService,
    private snackbar: MatSnackBar // Inject MatSnackBar here
  ) {
    this
      .loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getPhotoPath(photoNumber
                 :
                 number
  ):
    string {
    return `/assets/images/photo${photoNumber}.jpg`;
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  openRegistrationDialog(): void {
    this.appService.openRegistrationDialog();
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
        } else if (StorageService.isUserLoggedIn()) {
          this.router.navigateByUrl('user/dashboard');
        } else if (StorageService.isManagerLoggedIn()) {
          this.router.navigateByUrl('manager/dashboard');
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
