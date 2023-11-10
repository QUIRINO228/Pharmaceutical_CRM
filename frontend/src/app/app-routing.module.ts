import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import {ProductComponent} from "./components/product/product.component";

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
