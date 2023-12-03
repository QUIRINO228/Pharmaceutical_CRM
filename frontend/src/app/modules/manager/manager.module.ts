import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagerRoutingModule} from './manager-routing.module';
import {DashboardComponent} from './manager-components/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    HttpClientModule
  ]
})
export class ManagerModule { }
