import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';

// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';


import {ValidateService} from './services/validate.service';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import {PlanService} from './services/plan.service';

import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';



const appRoutes: Routes =  [
  {
    path:'admin', component: AdminComponent, children :[ 
        { path: '', component: LoginComponent },     
        { path: 'login', component: LoginComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'user', component: AdminCustomerComponent, canActivate: [AuthGuard], children :[
            { path: '', component: CustomerListComponent, },
            { path: 'add', component: CustomerAddComponent, },
            { path: ':id', component: CustomerEditComponent, },
        ]},
        { path: 'plan', component: AdminPlanComponent, canActivate: [AuthGuard], children :[
            { path: '', component: PlanListComponent, },
            { path: 'add', component: PlanAddComponent, },
            { path: ':id', component: PlanEditComponent, },
        ]},        
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent,
    SidebarComponent,
    AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule, 
  ],
  providers: [ValidateService, AdminService, AuthGuard, UserService, PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
