import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../admin-service/admin.service';

@Component({
    selector: 'app-update-task',
    templateUrl: './update-task.component.html',
    styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
    form: FormGroup;
    users: any[] | undefined;
    selectedUser: any = {};
    yourData: any;
    taskStatus: string[] = ['DONE', 'GIVEN', 'ACCEPTED', 'RE_DO', 'NOT_DONE'];
    taskId: number | undefined;

    constructor(
        private service: AdminService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = new FormGroup({
            header: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            user: new FormControl('', Validators.required),
            taskStatus: new FormControl('', Validators.required),
        });
    }

    onUserSelected() {
        const selectedUserId = this.form.value.user;

        if (this.users && this.users.length > 0) {
            this.selectedUser = this.users.find(user => user.id === selectedUserId);

            if (!this.selectedUser) {
                const selectedUserEmail = this.form.value.user;
                this.selectedUser = this.users.find(user => user.email === selectedUserEmail);
            }

            if (this.selectedUser) {
                console.log('Selected User:', this.selectedUser);
            } else {
                console.error('User not found for ID or email:', selectedUserId);
            }
        }

        this.form.markAsDirty();
    }



    ngOnInit() {
        // @ts-ignore
        this.taskId = +this.route.snapshot.paramMap.get('id');


        if (this.taskId) {
            this.service.getAllUsers().subscribe((users: any[]) => {
                this.users = users.filter(user => user.role === 'MANAGER' || user.role === 'WORKER');

                if (this.yourData && this.yourData.user) {
                    this.selectedUser = this.users.find(user => user.id === this.yourData.user.id);
                }
            });
        }
        this.service.getTask(this.taskId).subscribe(
            (task: any) => {
                this.form.patchValue({
                    header: task.header,
                    description: task.description,
                    user: task.user.id,
                    taskStatus: task.taskEnum,
                });
                // @ts-ignore
                this.selectedUser = this.users.find(user => user.id === task.user.id);
            },
            (error: any) => {
                console.error('Error loading task:', error);
            }
        );
    }




    submit() {
        if (this.form.valid) {
            const taskData = {
                header: this.form.value.header,
                description: this.form.value.description,
                email: this.selectedUser.email,
                taskStatus: this.form.value.taskStatus,
            };

            console.log(taskData);

            this.service.updateTask(this.taskId, taskData).subscribe(
                () => {
                    console.log('Task updated successfully');
                    this.router.navigate(['/tasks']);
                },
                (error: any) => {
                    console.error('Error updating task:', error);
                    // Handle error as needed
                }
            );
        } else {
            // Handle invalid form or missing user data
        }
    }
}
