import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./admin-components/dashboard/dashboard.component";
import {AdminGuard} from "../../services/guards/admin-gurad/admin.guard";

const routes: Routes = [
  {path: "dashboard", component:DashboardComponent, canActivate: [AdminGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
