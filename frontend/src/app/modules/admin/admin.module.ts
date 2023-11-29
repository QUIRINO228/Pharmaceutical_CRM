import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { ViewUserComponent } from './admin-components/view-user/view-user.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    DashboardComponent,
    ViewUserComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        MatTableModule
    ]
})
export class AdminModule { }
