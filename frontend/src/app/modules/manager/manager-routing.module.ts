import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./manager-components/dashboard/dashboard.component";
import {ManagerGuard} from "../../services/guards/manager-guard/manager.guard";


const routes: Routes = [
  {path: "dashboard", component:DashboardComponent,canActivate:[ManagerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
