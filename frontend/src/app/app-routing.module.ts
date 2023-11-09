import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./components/registration/registration.component";



const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModule { }
