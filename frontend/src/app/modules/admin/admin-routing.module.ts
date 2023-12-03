import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./admin-components/dashboard/dashboard.component";
import {HttpClientModule} from "@angular/common/http";
import {AdminGuard} from "../../services/guards/admin-gurad/admin.guard";
import {ViewUserComponent} from "./admin-components/view-user/view-user.component";
import {AddTaskComponent} from "./admin-components/add-task/add-task.component";
import {TasksComponent} from "./admin-components/tasks/tasks.component";
import {UpdateTaskComponent} from "./admin-components/update-task/update-task.component";


const routes: Routes = [
  {path: "dashboard", component:DashboardComponent, canActivate: [AdminGuard]},
  {path: "users", component:ViewUserComponent, canActivate: [AdminGuard]},
  {path: "task/add", component:AddTaskComponent, canActivate: [AdminGuard]},
  {path: "tasks", component:TasksComponent, canActivate: [AdminGuard]},
  {path: "task/update/:id", component:UpdateTaskComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
