import {AdminService} from '../../admin-service/admin.service';
import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  taskList: any[] = [];
  taskDataSource: any;
  taskDisplayedColumns: string[] = ['id', 'header', 'description', 'taskEnum', 'user', 'actions'];
  isEditing: boolean | undefined;
  editedItem: any;
  users: any[] = [];
  private form: FormGroup<{ header: FormControl<string | null>; description: FormControl<string | null>; user: FormControl<any> }>;
  private yourData: any;
  userFormControl: FormControl<string | null>;

  constructor(private service: AdminService, private router: Router, private  snackBar: MatSnackBar) {
    this.form = new FormGroup({
      header: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
    });

    this.userFormControl = new FormControl(this.yourData?.user?.id || '');
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.service.getAllTasks().subscribe(
      (tasks: any) => {
        this.taskList = tasks;
        this.taskDataSource = new MatTableDataSource(tasks);
        console.log(tasks);
      },
      (error: any) => {
        console.error('Error loading tasks:', error);
        this.snackBar.open('Error loading tasks', 'Close', {duration: 2000});
      }
    );
  }

  deleteTask(taskToDelete: any): void {
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      this.service.deleteTask(taskToDelete.id).subscribe(
        () => {
          this.snackBar.open('Task deleted successfully', 'Close', {duration: 2000});
          this.loadTasks();
        },
        (error: any) => {
          location.reload();
          console.error('Error deleting task:', error);
          this.snackBar.open('Error deleting task', 'Close', {duration: 2000});
        }
      );
    }
  }

  addTask(): void {
    this.router.navigate(['/admin/task/add']);
  }

  saveChanges() {
    this.isEditing = false;
    this.editedItem = null;
  }

  eDitTask(element: any) {
    const editUrl = `/admin/task/update/${element.id}`;
    this.router.navigate([editUrl]);
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedItem = null;
  }
}
