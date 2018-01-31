import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard , CustomerAuthGuard} from './guards/index';

import { AdminService, CustomerService, StaffService, BusinessService, PlanService} from './service/index';

/*Customer*/
import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent,CustomerForgetPasswordComponent, CustomerRegisterComponent } from './customer/login/customerlogin.component';
import { CustomerDashboardComponent, CustomerProfileComponent } from './customer/dashboard/dashboard.component';
import { CustomerHeaderComponent,CustomerSidebarComponent } from './header/customerheader.component';
import { CustomerBusinessComponent, CustomerBusinessListComponent, CustomerBusinessAddComponent, CustomerBusinessDocumentComponent, CustomerBusinessEditComponent } from './customer/business/business.component';

/*Admin*/
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent,AdminForgetPasswordComponent } from './admin/login/adminlogin.component';
import { DashboardComponent,AdminProfileComponent } from './admin/dashboard/dashboard.component';
import { AdminHeaderComponent,AdminSidebarComponent } from './header/adminheader.component';
import { StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent } from './admin/staff/staff.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';
import { AdminBusinessComponent,BusinessListComponent,BusinessEditComponent } from './admin/business/business.component';

import {OrderPipe} from "./order.pipe"
import {FilterPipe} from "./filter.pipe";
import { AccountActiveComponent } from './account-active/account-active.component';

@NgModule({
  declarations: [
    AppComponent,FileSelectDirective,
    AdminComponent,
    AdminLoginComponent,AdminForgetPasswordComponent,
    AdminHeaderComponent,AdminSidebarComponent,
    DashboardComponent,AdminProfileComponent,
    StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent,
    AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
    AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent,
    AdminBusinessComponent,BusinessListComponent,BusinessEditComponent,

    CustomerComponent,
    CustomerLoginComponent, CustomerRegisterComponent, CustomerForgetPasswordComponent,
    CustomerDashboardComponent, CustomerProfileComponent,
    CustomerHeaderComponent,CustomerSidebarComponent,
    CustomerBusinessComponent, CustomerBusinessListComponent, CustomerBusinessAddComponent, CustomerBusinessDocumentComponent, CustomerBusinessEditComponent, AccountActiveComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, CustomerAuthGuard, AdminService, CustomerService, StaffService, BusinessService, PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
