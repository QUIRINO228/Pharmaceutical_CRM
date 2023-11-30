import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];
  selectedUser: any;
  yourData: any;

  constructor(private service: AdminService, private router: Router) {
    this.form = new FormGroup({
      header: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
    });
  }

  onUserSelected() {
    this.selectedUser = this.form.value.user;
  }

  ngOnInit() {
    this.service.getAllUsers().subscribe((users: any[]) => {
      this.users = users.filter(user => user.role === 'MANAGER' || user.role === 'WORKER');
      console.log(this.users);
      if (this.yourData && this.yourData.user) {
        this.selectedUser = this.users.find(user => user.id === this.yourData.user.id);
      }
    });
  }


  submit() {
    if (this.form.valid && this.selectedUser) {
      const taskData = {
        header: this.form.value.header,
        description: this.form.value.description,
        email: this.selectedUser.email,
      };

      console.log(taskData);

      this.service.addTask(taskData).subscribe(
          () => {
            console.log('Task added successfully');
            this.router.navigate(['/tasks']);
          },
          (error: any) => {
            this.router.navigate(['/tasks']);
          }
      );
    } else {

    }
  }
}
