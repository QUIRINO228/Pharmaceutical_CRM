import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { ViewUserComponent } from './admin-components/view-user/view-user.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { TasksComponent } from './admin-components/tasks/tasks.component';
import { AddTaskComponent } from './admin-components/add-task/add-task.component';
import { UpdateTaskComponent } from './admin-components/update-task/update-task.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewUserComponent,
    TasksComponent,
    AddTaskComponent,
    UpdateTaskComponent
  ],
    imports: [
        FormsModule,
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
