import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  err = '';
  customerAddForm: FormGroup;
  cpForm: FormGroup;
  passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
  emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  passwordp : any = '';
  newo : any = false;
  MutchPassword : any = false;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'email' : '',
  };

  validationMessages = {
      'firstname': {
          'required':      'First Name is required.',
      },
      'lastname': {
          'required':      'Last Name is required.',
      },
      'email' : {
          'required':      'Email is required.',
          'pattern'   :    'Email not in well format.'
      },
      'phonenumber' : {
          'required':      'Phone Number is required.',
      }
  };

  cpFormErrors = {
      'password' : '',
      'newpassword' : ''     
  };

  cpValidationMessages = {
      'password' : {
          'required':    'Password is required.',
          'pattern' :    'Please Enter at least one letter and number',
          'minlength':   'Password should contain 6 characters',
      },
      'newpassword' : {
          'required':    'Password is required.',
          'pattern' :    'Please Enter at least one letter and number',
          'minlength':   'Password should contain 6 characters',
      }
  }

  constructor(
    private adminService:AdminService, 
    private router:Router,
    private lf: FormBuilder,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {


    this.customerAddForm = this.lf.group({
        _id: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phonenumber: ['', Validators.required],
        dob: [''],
        email: ['', [Validators.required, Validators.pattern(this.emailp)]],
    });

    this.cpForm = this.lf.group({
        _id: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
        newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]]
    });

    
    
    this.cpForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    

    this.adminService.getProfile().subscribe(profile => {
      console.log(profile);
      this.user = profile.user;
      this.customerAddForm.patchValue(this.user);
      this.onValueChanged();
      this.cpForm.controls["_id"].setValue(this.user._id);
    },
    err => {
      console.log(err);
      return false;
    });

    
  }

  getUserById(id){
        this.adminService.getUserById(id).subscribe(
            (data) => {
              if (!data.error) {
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(data.message));
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private matchpasswordreg(){
        if (this.cpForm.value.newpassword != '') {
            if(this.cpForm.value.password == this.cpForm.value.newpassword){
                this.cpForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;   
            }else{
                this.cpForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }
    }

    onValueChanged(data?: any) {
        if (!this.cpForm) {return;  }
        const form = this.cpForm;

        for (const field in this.cpFormErrors) {
            // clear previous error message (if any)
            this.cpFormErrors[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
                const messages = this.cpValidationMessages[field];
                for (const key in control.errors) {
                    this.cpFormErrors[field] += messages[key] + ' ';          
                }
            }
        }
    }


    adminUpdate(){
        this.adminService.userUpdate(this.customerAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Profile updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                  this.getUserById(this.customerAddForm.value._id);
                  this.router.navigate(['admin/dashboard']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-success', timeout: 5000 });
            }
        );
    }

    adminChangePassword(){
        this.adminService.changePassword(this.cpForm.value).subscribe(
            (data) => {
                console.log("data");
                console.log(data);
              if (!data.error) {
                  this.getUserById(this.cpForm.value._id);
                  this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                  this.router.navigate(['admin/dashboard']);
                }else{
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-success', timeout: 5000 });
                console.log('kfgbhj');
            }
        );
    }

}
