import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../../app.service";
import {Router} from '@angular/router';
import { AbstractControl, ValidationErrors, AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const asyncNameValidator: AsyncValidatorFn = (
  control: AbstractControl
): Observable<ValidationErrors | null> => {
  return of(control.value).pipe(
    map((name: string) => {
      const valid = /^[a-zA-Z-]{2,}$/.test(name);
      return valid ? null : { invalidName: true };
    }),
    catchError(() => of(null))
  );
};

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
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z-]{2,}$/)], [asyncNameValidator] ],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z-]{2,}$/)], [asyncNameValidator] ],
      password: ['', [Validators.required, Validators.minLength(8)]],
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


