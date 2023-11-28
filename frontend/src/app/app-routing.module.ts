import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";


import {LoginComponent} from "./components/login/login.component";
import {noAuthGuard} from "./services/guards/noAuth-guard/no-auth.guard";


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [noAuthGuard]},
  {path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then(m =>m.AdminModule)},
  {path: 'user', loadChildren: () => import("./modules/user/user.module").then(m =>m.UserModule)},
  {path: 'manager', loadChildren: () => import("./modules/manager/manager.module").then(m =>m.ManagerModule)},
  {path: 'worker', loadChildren: () => import("./modules/worker/worker.module").then(m =>m.WorkerModule)},

];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
