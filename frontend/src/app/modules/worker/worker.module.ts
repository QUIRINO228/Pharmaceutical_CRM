import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { DashboardComponent } from './worker-component/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    HttpClientModule
  ]
})
export class WorkerModule { }
