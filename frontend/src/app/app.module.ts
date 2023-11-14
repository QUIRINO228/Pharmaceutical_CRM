import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {RegistrationComponent} from './components/registration/registration.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';
import { ViewproductsComponent } from './components/viewproduct/viewproduct.component';
import {ActivateAccountComponent} from "./components/activate-account/activate-account.component";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AddproductComponent,
    UpdateproductComponent,
    ViewproductsComponent,
    ActivateAccountComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
