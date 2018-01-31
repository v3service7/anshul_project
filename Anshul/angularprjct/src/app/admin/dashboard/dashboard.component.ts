import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

/*service*/
import { AdminService, CustomerService, StaffService, PlanService} from '../../service/index';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    currentAdmin: any = {};
    staffs: any = [];
    plans: any = [];
    customers: any = [];
    loginForm: FormGroup;
      returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private staffService: StaffService,
        private customerService: CustomerService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
        this.getCustomerList()
        this.getStaffList()
        this.getPlanList()
    }

    getCustomerList(){
        this.customerService.customerList().subscribe(
            (data) => {
              if (!data.error) {
                     this.customers = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getStaffList(){
        this.staffService.staffList().subscribe(
            (data) => {
              if (!data.error) {
                     this.staffs = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getPlanList(){
        this.planService.planList().subscribe(
            (data) => {
              if (!data.error) {
                     this.plans = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AdminProfileComponent implements OnInit {
    currentAdmin: any = {};
	err = '';
    customerAddForm: FormGroup;
	cpForm: FormGroup;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordp : any = '';
    newo : any = false;
    MutchPassword : any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'email' : '',
        'username' : '',
        'password' : '',
        'newpassword' : ''     
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'username': {
            'required':      'Username is required.',
        },
        'email' : {
            'required':      'Email is required.',
            'pattern'   :    'Email not in well format.'
        }, 
        'password' : {
            'required':      'Password is required.'
        },
        'newpassword' : {
            'required':      'Password is required.'
        }            
    };

    cpFormErrors = {
        'password' : '',
        'newpassword' : ''     
    };

    cpValidationMessages = {
        'password' : {
            'required':      'Password is required.'
        },
        'newpassword' : {
            'required':      'Password is required.'
        }  
    }

  	constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
  		this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  	}

  	ngOnInit() {
        this.customerAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', Validators.required]
        });

        this.cpForm = this.lf.group({
            _id: ['', Validators.required],
            password: ['', Validators.required],
            newpassword: ['', Validators.required]
        });

        this.customerAddForm.patchValue(this.currentAdmin);
        this.cpForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.cpForm.controls["_id"].setValue(this.currentAdmin._id);
  	}

    admin(id){
        this.adminService.admin(id).subscribe(
            (data) => {
              if (!data.error) {
                    localStorage.removeItem('currentAdmin');
                    localStorage.setItem('currentAdmin', JSON.stringify(data.message));
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private matchpasswordreg(){
        if(this.cpForm.value.password == this.cpForm.value.newpassword){
            this.cpForm.controls["matchpass"].setValue(true);
            this.MutchPassword = false;   
        }else{
            this.cpForm.controls["matchpass"].setValue("");
            this.MutchPassword = true;
        }
    }

    onValueChanged(data?: any) {
        if (!this.cpForm) {return;  }
        const form = this.cpForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
                const messages = this.cpValidationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';          
                }
            }
        }
    }


    adminUpdate(){
        this.adminService.adminUpdate(this.customerAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.admin(this.customerAddForm.value._id);
                  this.router.navigate(['admin/dashboard']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }


    adminChangePassword(){
        this.adminService.adminChangePassword(this.cpForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.admin(this.cpForm.value._id);
                  this.router.navigate(['admin/dashboard']);
                }else{
                    this.err = 'Old password was wrong';
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}