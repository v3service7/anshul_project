import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { TinymceModule } from 'angular2-tinymce';
// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ForgotPasswordComponent,AdminResetPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent } from './admin/pages/pages.component';
import { AdminExchangeComponent, ExchangeListComponent, ExchangeAddComponent, ExchangeEditComponent } from './admin/exchanges/exchange.component';
import { AdminExchangeapiComponent, ExchangeapiListComponent, ExchangeapiAddComponent, ExchangeapiEditComponent } from './admin/exchangeapi/exchangeapi.component';
import { AdminAccountdetailComponent,AccountdetailListComponent } from './admin/accountdetail/accountdetail.component';

// Frontend Component
import { FrontendComponent } from './frontend/frontend.component';
import { HomeComponent } from './frontend/home/home.component';
import { UserComponent } from './frontend/user/user.component';
import { SignupComponent } from './frontend/signup/signup.component';
import { UserloginComponent } from './frontend/userlogin/userlogin.component';
import { FrontheaderComponent } from './frontend/frontheader/frontheader.component';
import { FrontfooterComponent } from './frontend/frontfooter/frontfooter.component';
import { MyprofileComponent } from './frontend/myprofile/myprofile.component';
import { ForgotComponent, ResetComponent } from './frontend/forgot/forgot.component';
import { SuccessComponent } from './frontend/success/success.component';
import { CancelComponent } from './frontend/cancel/cancel.component';

import {ValidateService} from './services/validate.service';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import {PlanService} from './services/plan.service';
import { PagesService} from './services/pages.service';
import { PurchaseplanService} from './services/purchaseplan.service';
import { ExchangeService} from './services/exchange.service';
import { ExchangeapiService} from './services/exchangeapi.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';

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
        { path: 'exchangeapi', component: AdminExchangeapiComponent, canActivate: [AuthGuard], children :[
            { path: '', component: ExchangeapiListComponent, },
            { path: 'add', component: ExchangeapiAddComponent, },
            { path: ':id', component: ExchangeapiEditComponent, },
        ]},  
        { path: 'accountdetail', component: AdminAccountdetailComponent, canActivate: [AuthGuard], children :[
            { path: '', component: AccountdetailListComponent, },
        ]},    
    ]},
    {
    path:'', component: FrontendComponent, children :[ 
        { path: '', component: HomeComponent },     
        { path: 'login', component: UserloginComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'forgotpassword', component: ForgotComponent },
        { path: 'profile', component: MyprofileComponent, canActivate: [UserGuard] },
        { path: 'success', component: SuccessComponent, canActivate: [UserGuard]},
        { path: 'cancel', component: CancelComponent, canActivate: [UserGuard]},
        { path: 'resetpassword/:id', component: ResetComponent },       
    ]}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent,
    ForgotPasswordComponent,AdminResetPasswordComponent,
    AdminAccountdetailComponent,AccountdetailListComponent,
    SidebarComponent,
    AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
    AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent,
    AdminExchangeComponent, ExchangeListComponent, ExchangeAddComponent, ExchangeEditComponent, 
    AdminExchangeapiComponent, ExchangeapiListComponent, ExchangeapiAddComponent, ExchangeapiEditComponent,
    FrontendComponent, 
    FrontheaderComponent,
    HomeComponent, 
    UserComponent, 
    SignupComponent, 
    ResetComponent,
    UserloginComponent, FrontfooterComponent, MyprofileComponent, ForgotComponent,SuccessComponent,CancelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TinymceModule.withConfig({}),
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule, 
  ],
  providers: [ValidateService, AdminService, AuthGuard, UserGuard, UserService, PlanService, PagesService, ExchangeService,ExchangeapiService,PurchaseplanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
