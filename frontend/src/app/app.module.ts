import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import {RegistrationComponent} from './components/registration/registration.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';
import { ViewproductsComponent } from './components/viewproduct/viewproduct.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import {NgOptimizedImage} from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ForgotMessageComponent } from './components/forgot-message/forgot-message.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AddproductComponent,
    UpdateproductComponent,
    ViewproductsComponent,
    ActivateUserComponent,
    ForgotMessageComponent,
    ChangePasswordComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgbModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
