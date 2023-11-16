import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {HttpClient } from '@angular/common/http';
import { AppService } from "../../app.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {

  form = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
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
    this.service.checkActivateCode(link, code).subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
