import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from "../../app.service";

@Component({
    selector: 'app-forgot-message',
    templateUrl: './forgot-message.component.html',
    styleUrls: ['./forgot-message.component.css']
})
export class ForgotMessageComponent {
    email: string = ''

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });

    constructor(private service: AppService, private router: Router) {
    }


    submit() {
        if (this.form.valid) {
            const email: string | null = this.form.get('email')!.value;
            if (typeof email === 'string') {
                this.service.forgotMessage(email).subscribe(data => {
                    this.router.navigate(['/login']);
                });
            }

        }
    }
}
