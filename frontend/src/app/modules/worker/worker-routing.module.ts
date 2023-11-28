import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../admin/admin-components/dashboard/dashboard.component";
import {WorkerGuard} from "../../services/guards/worker-guard/worker.guard.guard";

const routes: Routes = [
  {path: "dashboard", component:DashboardComponent,canActivate: [WorkerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
