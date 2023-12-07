import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";


import {LoginComponent} from "./components/login/login.component";
import {noAuthGuard} from "./services/guards/noAuth-guard/no-auth.guard";
import {ActivateUserComponent} from "./components/activate-user/activate-user.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {ForgotMessageComponent} from "./components/forgot-message/forgot-message.component";
import {ViewproductsComponent} from "./components/viewproduct/viewproduct.component";
import {UpdateproductComponent} from "./components/updateproduct/updateproduct.component";
import {MyTasksComponent} from "./components/my-tasks/my-tasks.component";
import {StorageComponent} from "./components/storage/storage.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {CreateOrderComponent} from "./components/create-order/create-order.component";
import {OrderComponent} from "./components/order/order.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [noAuthGuard]},
  {path: '', redirectTo: "/login", pathMatch: 'full'},
  {path: 'activate/:link', component: ActivateUserComponent, canActivate: [noAuthGuard]},
  {path: 'change-password/:link', component: ChangePasswordComponent, canActivate: [noAuthGuard]},
  {path: 'forgot-password', component: ForgotMessageComponent, canActivate: [noAuthGuard]},
  {path: 'products', component: ViewproductsComponent},
  {path: 'update/:id', component: UpdateproductComponent},
  {path: 'my-tasks', component: MyTasksComponent},
  {path: 'storage', component: StorageComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order/:id', component: OrderComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'create-order', component: CreateOrderComponent},
  {path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then(m =>m.AdminModule)},
  {path: 'user', loadChildren: () => import("./modules/user/user.module").then(m =>m.UserModule)},
  {path: 'manager', loadChildren: () => import("./modules/manager/manager.module").then(m =>m.ManagerModule)},
];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
