import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {AddproductComponent} from './components/addproduct/addproduct.component';
import {UpdateproductComponent} from './components/updateproduct/updateproduct.component';
import {ViewproductsComponent} from './components/viewproduct/viewproduct.component';
import {ActivateUserComponent} from "./components/activate-user/activate-user.component";


const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'product', component: ViewproductsComponent},
  {path: '', redirectTo: '/product', pathMatch: 'full'},
  {path: 'add', component: AddproductComponent},
  {path: 'update/:id', component: UpdateproductComponent},
  {path: 'activate/:link', component: ActivateUserComponent},
  {path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then(m =>m.AdminModule)},
  {path: 'worker', loadChildren: () => import("./modules/worker/worker.module").then(m =>m.WorkerModule)}
];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
