import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { FileUploadModule , FileDropDirective } from 'ng2-file-upload';
import {Ng2PaginationModule} from 'ng2-pagination';

import { AppComponent } from './app.component';

// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminCityComponent, CityListComponent,CityAddComponent,CityEditComponent,CityCsvAddComponent} from './admin/city/city.component';
import { AdminCountyComponent, CountyListComponent,CountyAddComponent,CountyEditComponent,CountyCsvAddComponent} from './admin/county/county.component';

import {ValidateService} from './services/validate.service';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import { CityService} from './services/city.service';
import { CountyService} from './services/county.service';

import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { SidebarComponent } from './admin/sidebar/sidebar.component';



const appRoutes: Routes =  [
  {
    path:'admin', component: AdminComponent, children :[ 
        { path: '', component: LoginComponent },     
        { path: 'login', component: LoginComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'county', component: AdminCountyComponent, canActivate: [AuthGuard], children :[
            { path: '', component: CountyListComponent, },
            { path: 'add', component: CountyAddComponent, },
            { path: 'addcsv', component: CountyCsvAddComponent, },
            { path: ':id', component: CountyEditComponent, },
        ]},
        { path: 'city', component: AdminCityComponent, canActivate: [AuthGuard], children :[
            { path: '', component: CityListComponent, },
            { path: 'add', component: CityAddComponent, },
            { path: 'addcsv', component: CityCsvAddComponent, },
            { path: ':id', component: CityEditComponent, },
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
    SidebarComponent,
    AdminCityComponent,CityListComponent,CityAddComponent,CityEditComponent,CityCsvAddComponent,
    AdminCountyComponent, CountyListComponent,CountyAddComponent,CountyEditComponent,CountyCsvAddComponent,
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule, 
    Ng2PaginationModule,
  ],
  exports: [FileUploadModule],
  providers: [ValidateService, AdminService, AuthGuard, UserService,CityService,CountyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
