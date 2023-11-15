import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';


@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styleUrls: ['./activation.component.css'],
})
export class ActivateAccountComponent implements OnInit {
    link: string | undefined;
    activationCode: number | undefined;
    activationError: string | undefined;

    constructor(private route: ActivatedRoute, private service: AppService, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.link = params['link'];
        });
    }

    onSubmit(): void {
        this.activationError = undefined; // Clear previous error
        this.service.activateAccount(this.link, this.activationCode).subscribe(
            (response: any) => {
                console.log(response);
                this.router.navigate(['/login']);
            },
            (error: any) => {
                console.error(error);
                this.activationError = 'Activation failed. Please check your activation code.';
            }
        );
    }
}
