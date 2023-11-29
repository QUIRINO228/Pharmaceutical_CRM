import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {HttpClient } from '@angular/common/http';
import { AppService } from "../../app.service";
import { Router } from '@angular/router';
import {ForgotCodeDTO} from "../../ForgotCodeDTO";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  implements OnInit {

  form = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required]),
    passwordMatch: new FormControl(null, [Validators.required]),
  });

  constructor(private service: AppService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const link = params['link'];
    });
  }

  submit() {
    const link = this.route.snapshot.params['link'];
    const code = this.form.get('code')?.value;
    const password = this.form.get('password')?.value;
    const passwordMatch = this.form.get('passwordMatch')?.value;
    if (password != passwordMatch) return
    const forgotCodeDTO: ForgotCodeDTO = {
      code, password
    }
    this.service.changePassword(link,forgotCodeDTO).subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
