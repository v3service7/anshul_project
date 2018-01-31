import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

/*service*/
import { CustomerService} from '../../service/index';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.css']
})
export class CustomerLoginComponent implements OnInit {
	currentCustomer: any = {};
	loginForm: FormGroup;
  	returnUrl: string;
  	emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    err='';

  	constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  	ngOnInit() {
      	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
		this.loginForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
        	password: ['', Validators.required],
      	});
  	}

    login(){
        this.customerService.customerLogin(this.loginForm.value).subscribe(
            (data) => {
              if (!data.error) {
              	    localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                    this.router.navigate([this.returnUrl]);
                }else{
                	this.err = data.message;
                	this.loginForm.reset();
                }
            },
            (err)=>{
            	this.err = 'Invalid Username/Password';
                this.loginForm.reset();
            }
        );
    }
}

@Component({
  selector: 'app-customer-register',
  templateUrl: './customerregister.component.html',
  styleUrls: ['./customerlogin.component.css']
})
export class CustomerRegisterComponent implements OnInit {

      currentCustomer: any = {};
      registerForm: FormGroup;
      returnUrl: string;
      err = '';
      emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      passwordp : any = '';
      newo : any = false;
      MutchPassword : any = false;

    formErrors = {
        'email' : '',
        'phonenumber' : '',
        'password' : '',
        'newpassword' : ''     
    };

    validationMessages = {
        'phonenumber': {
            'required':      'Phone Number is required.',
        },
        'email' : {
            'required':      'Email is required.',
            'pattern'   :    'Email is not valid.'
        }, 
        'password' : {
            'required':      'Password is required.'
        },
        'newpassword' : {
            'required':      'Password is required.'
        }            
    };

  	constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  	ngOnInit() {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';

		this.registerForm = this.lf.group({
          email: ['', [Validators.required, Validators.pattern(this.emailp)]],
        	phonenumber: ['', Validators.required],
        	password: ['', Validators.required],
            matchpass : ['', Validators.required],
        	newpassword: ['', Validators.required],
      	});

        this.registerForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
  	}

    private matchpasswordreg(){

        if(this.registerForm.value.password == this.registerForm.value.newpassword){
            this.registerForm.controls["matchpass"].setValue(true);
            this.MutchPassword = false;   
        }else{
            this.registerForm.controls["matchpass"].setValue("");
            this.MutchPassword = true;
        }

    }

    register(){
        this.customerService.customerAdd(this.registerForm.value).subscribe(
            (data) => {
              if (!data.error) {
              	    localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                    this.router.navigate(['customer/login']);
                }else{
                	this.err = 'Email already in use';
                    //this.router.navigate(['customer/login']);
                }
            },
            (err)=>{
                this.router.navigate(['customer/login']);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.registerForm) {return;  }
        const form = this.registerForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';          
                }
            }
        }
    }
}

@Component({
  selector: 'app-customer-forgetpassword',
  templateUrl: './customerforgetpassword.component.html',
  styleUrls: ['./customerlogin.component.css'],
})
export class CustomerForgetPasswordComponent implements OnInit {
	currentCustomer: any = {};
	loginForm: FormGroup;
  	returnUrl: string;
	err:any;

  	constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  	ngOnInit() {
      	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
		this.loginForm = this.lf.group({
        	email: ['', Validators.required]
      	});
  	}

    forgetPassword(){
        this.customerService.customerForgetPassword(this.loginForm.value).subscribe(
            (data) => {
              if (data.status) {
                    this.router.navigate(['customer/login']);
                }else{
                    this.router.navigate(['customer/login']);
                }
            },
            (err)=>{
            	this.router.navigate(['customer/login']);
            }
        );
    }
}