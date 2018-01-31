import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ExchangeapiService} from '../../services/exchangeapi.service';
import { AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin-exchangeapi',
  templateUrl: './exchangeapi.component.html',
  styleUrls: ['./exchangeapi.component.css'],
})
export class AdminExchangeapiComponent implements OnInit {

    constructor() {}
    ngOnInit() {}
}

@Component({
  selector: 'app-admin-exchangeapi-list',
  templateUrl: './exchangeapilist.component.html',
  styleUrls: ['./exchangeapi.component.css'],
})
export class ExchangeapiListComponent implements OnInit {
    plans: any=[];
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private exchangeapiService: ExchangeapiService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.getList()
    }

    getList(){
        this.exchangeapiService.exchangeapiList().subscribe(
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

    private deletePlan(id) {
        if(confirm("Are you sure to delete ?")) {
            this._flashMessagesService.show('Exchange API Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.exchangeapiService.exchangeapiDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-exchangeapi-add',
  templateUrl: './exchangeapiadd.component.html',
  styleUrls: ['./exchangeapi.component.css'],
})
export class ExchangeapiAddComponent implements OnInit {
    users: any = [];
    planAddForm: FormGroup;

    formErrors = {
        'exchangeapiName': '',
        'exchangeUrl': '',
    };

    validationMessages = {
        'exchangeapiName': {
            'required':      'Exchangeapi Name is required.',
        },
        'exchangeUrl': {
            'required':      'Exchangeapi Url is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private exchangeapiService: ExchangeapiService,
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            exchangeapiName: ['', Validators.required],
            exchangeUrl: ['', Validators.required]
        });
        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getUserList();
    }

    planAdd(){
        this.exchangeapiService.exchangeapiAdd(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Exchange API Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/exchangeapi']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getUserList(){
        this.adminService.userList().subscribe(
            (data) => {
              if (!data.error) {
                     this.users = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.planAddForm) {return;  }
        const form = this.planAddForm;

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
  selector: 'app-admin-exchangeapi-edit',
  templateUrl: './exchangeapiedit.component.html',
  styleUrls: ['./exchangeapi.component.css'],
})
export class ExchangeapiEditComponent implements OnInit {
	currentCustomer: any = {};
    planAddForm: FormGroup;
    users: any = [];

    formErrors = {
        'exchangeapiName': '',
        'exchangeUrl': '',
    };

    validationMessages = {
        'exchangeapiName': {
            'required':      'Exchangeapi Name is required.',
        },
        'exchangeUrl': {
            'required':      'Exchangeapi Url is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private exchangeapiService: ExchangeapiService,
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            exchangeapiName: ['', Validators.required],
            exchangeUrl: ['', Validators.required],
             _id: ['', Validators.required]
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.plan(id);
            this.getUserList();
        });    

        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }


    getUserList(){
        this.adminService.userList().subscribe(
            (data) => {
              if (!data.error) {
                     this.users = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    planUpdate(){
        this.exchangeapiService.exchangeapiUpdate(this.planAddForm.value).subscribe(

            (data) => {
              if (!data.error) {

                  this._flashMessagesService.show('Exchange API Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/exchangeapi']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    plan(id){
        this.exchangeapiService.exchangeapi(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentCustomer = data.message;
                  this.planAddForm.patchValue(this.currentCustomer);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.planAddForm) {return;  }
        const form = this.planAddForm;

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