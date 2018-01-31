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
import { ProfileComponent } from './admin/profile/profile.component';
import { ForgotPasswordComponent,AdminResetPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { UserComponent, UserListComponent, UserAddComponent, UserEditComponent} from './admin/user/user.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';

import { AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent } from './admin/pages/pages.component';

import { AdminExchangeComponent, ExchangeListComponent, ExchangeAddComponent, ExchangeEditComponent } from './admin/exchanges/exchange.component';

import {ValidateService} from './services/validate.service';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import {PlanService} from './services/plan.service';
import { PagesService} from './services/pages.service';
import { ExchangeService} from './services/exchange.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';



const appRoutes: Routes =  [
  {
    path:'admin', component: AdminComponent, children :[ 
        { path: '', component: LoginComponent },     
        { path: 'login', component: LoginComponent },
        { path: 'forgotpassword', component: ForgotPasswordComponent },
        { path: 'resetpassword/:id', component: AdminResetPasswordComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
        { path: 'pages', component: AdminPagesComponent, canActivate: [AuthGuard], children :[
            { path: '', component: PagesListComponent, },
            { path: 'add', component: PagesAddComponent, },
            { path: ':id', component: PagesEditComponent, },
        ]},
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
        { path: 'exchange', component: AdminExchangeComponent, canActivate: [AuthGuard], children :[
            { path: '', component: ExchangeListComponent, },
            { path: 'add', component: ExchangeAddComponent, },
            { path: ':id', component: ExchangeEditComponent, },
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
    ProfileComponent,
    AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent,
    UserComponent, UserListComponent, UserAddComponent, UserEditComponent,
    ForgotPasswordComponent,AdminResetPasswordComponent,
    SidebarComponent,
    AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
     AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent,
    AdminExchangeComponent, ExchangeListComponent, ExchangeAddComponent, ExchangeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule, 
  ],
  providers: [ValidateService, AdminService, AuthGuard, UserService, PlanService, PagesService, ExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
