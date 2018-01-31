import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

/*service*/
import { AdminService} from '../../service/index';


@Component({
  selector: 'app-admin-login',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminLoginComponent implements OnInit {
	currentAdmin: any = {};
	loginForm: FormGroup;
  	returnUrl: string;
	err:any;

  	constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
  		this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  	}

  	ngOnInit() {
      	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
		this.loginForm = this.lf.group({
        	username: ['', Validators.required],
        	password: ['', Validators.required],
      	});
  	}

    login(){
        this.adminService.adminLogin(this.loginForm.value).subscribe(
            (data) => {
              if (!data.error) {
              	    localStorage.setItem('currentAdmin', JSON.stringify(data.message));
                    this.router.navigate([this.returnUrl]);
                }else{
                    this.router.navigate(['admin/login']);
                }
            },
            (err)=>{
                this.router.navigate(['admin/login']);
            }
        );
    }
}

@Component({
  selector: 'app-admin-forgetpassword',
  templateUrl: './adminforgetpassword.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminForgetPasswordComponent implements OnInit {
	currentAdmin: any = {};
	loginForm: FormGroup;
  	returnUrl: string;
	err:any;

  	constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
  		this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  	}

  	ngOnInit() {
      	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
		this.loginForm = this.lf.group({
        	email: ['', Validators.required]
      	});
  	}

    forgetPassword(){
        this.adminService.adminForgetPassword(this.loginForm.value).subscribe(
            (data) => {
              if (data.status) {
                    this.router.navigate(['admin/login']);
                }else{
                    this.router.navigate(['admin/login']);
                }
            },
            (err)=>{
            	this.router.navigate(['admin/login']);
            }
        );
    }
}