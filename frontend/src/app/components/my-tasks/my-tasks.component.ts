import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  userTasks: any[] = [];
  userId: number | undefined;

  constructor(private service: AppService) {}

  ngOnInit() {

    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.userId = userObj.user_id;
    }

    if (this.userId) {
      this.service.getUserTasks(this.userId).subscribe(
        (tasks: any[]) => {

          this.userTasks = tasks.filter(task => task.taskEnum !== 'DONE');
          console.log(this.userTasks)
        },
        (error: any) => {
          console.error('Error fetching user tasks:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage.');
    }
  }

    onComplete(id: number) {
        this.service.CompleteTask(id).subscribe(
          (data: any) => {
            console.log(data)
          })
    }
}
