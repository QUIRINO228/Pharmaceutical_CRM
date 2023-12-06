import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../admin-service/admin.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  form: FormGroup;
  selectedUser: any = {};
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
      taskStatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    this.service.getTask(this.taskId).subscribe(
      (task: any) => {
        console.log(task);
        this.form.patchValue({
          header: task.header,
          description: task.description,
          taskStatus: task.taskStatus,
        });
      }
    );
  }


  submit() {
    if (this.form.valid) {
      const taskData = {
        id: this.route.snapshot.paramMap.get('id')!,
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
          if (error.status === 200) {
            const errorMessage = error.error.text;
            if (errorMessage.includes('Task added successfully')) {
              console.log('Task updated successfully:', errorMessage);
              this.router.navigate(['/admin/tasks']);
              return;
            }
          }
        }
      );
    } else {
    }
  }
}
