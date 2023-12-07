import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RegistrationComponent} from './components/registration/registration.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {AddproductComponent} from './components/addproduct/addproduct.component';
import {UpdateproductComponent} from './components/updateproduct/updateproduct.component';
import {ViewproductsComponent} from './components/viewproduct/viewproduct.component';
import {ActivateUserComponent} from './components/activate-user/activate-user.component';
import {NgOptimizedImage} from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {ForgotMessageComponent} from "./components/forgot-message/forgot-message.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {AuthService} from "./services/auth/auth.service";
import {MyTasksComponent} from "./components/my-tasks/my-tasks.component";
import {OrdersComponent} from './components/orders/orders.component';
import {StorageComponent} from "./components/storage/storage.component";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { BasketComponent } from './components/basket/basket.component';
import { OrderComponent } from './components/order/order.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import {NgxMaskDirective} from "ngx-mask";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatExpansionModule} from "@angular/material/expansion";





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
    MyTasksComponent,
    StorageComponent,
    OrdersComponent,
    BasketComponent,
    OrderComponent,
    CreateOrderComponent,
    MyOrdersComponent
  ],
    imports: [
        MatTableModule,
        MatInputModule,
        MatIconModule,
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
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        FlexLayoutModule,
        MatExpansionModule,
        RouterModule.forRoot([
            {path: '', component: ViewproductsComponent},
            {path: 'products/:productId', component: ViewproductsComponent},
            {path: 'basket', component: BasketComponent},
        ]),
        FormsModule,
        NgxMaskDirective,
    ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
