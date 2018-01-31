import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ExchangeService} from '../../services/exchange.service';
import { AdminService} from '../../services/admin.service';
import { ExchangeapiService} from '../../services/exchangeapi.service';

@Component({
  selector: 'app-admin-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class AdminExchangeComponent implements OnInit {

    constructor() {}
    ngOnInit() {}
}

@Component({
  selector: 'app-admin-exchange-list',
  templateUrl: './exchangelist.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeListComponent implements OnInit {
    plans: any=[];
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private exchangeService: ExchangeService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.getList()
    }

    getList(){
        this.exchangeService.exchangeList().subscribe(
            (data) => {
                console.log(data);
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
            this._flashMessagesService.show('Exchange Account Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.exchangeService.exchangeDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-exchange-add',
  templateUrl: './exchangeadd.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeAddComponent implements OnInit {
    users: any = [];
    exchangeNames: any = [];
    exchangeTypes = ['Exchange', 'Margin Trading', 'Deposit'];
    planAddForm: FormGroup;

    formErrors = {
        'exchangeName': '',
        'exchangeType': '',
        'nickName': '',
        'apiKey': '',
        'secretKey': '',
        'user': '',
    };

    validationMessages = {
        'exchangeName': {
            'required':      'Exchange Name is required.',
        },
        'exchangeType': {
            'required':      'Exchange Type is required.',
        },
        'nickName': {
            'required':      'Nick Name is required.',
        },
        'apiKey': {
            'required':      'API Key is required.',
        },
        'secretKey': {
            'required':      'Secret Key is required.',
        },
        'user': {
            'required':      'User is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private exchangeService: ExchangeService,
        private exchangeapiService: ExchangeapiService,
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            exchangeName: ['', Validators.required],
            exchangeType: ['', Validators.required],
            nickName: ['', Validators.required],
            apiKey: ['', Validators.required],
            secretKey: ['', Validators.required],
            user: ['', Validators.required]
        });
        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getUserList();
        this.getApiList();
    }

    planAdd(){
        console.log(this.planAddForm.value);
        this.exchangeService.exchangeAdd(this.planAddForm.value).subscribe(
            (data) => {
                console.log(data);
              if (!data.error) {
                  this._flashMessagesService.show('Exchange Account Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/exchange']);
                }else{
                    this._flashMessagesService.show('Exchange API Already exists', { cssClass: 'alert-danger', timeout: 3000 });
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

    getApiList(){
        this.exchangeapiService.exchangeapiList().subscribe(
            (data) => {
              if (!data.error) {
                     this.exchangeNames = data.message
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
  selector: 'app-admin-exchange-edit',
  templateUrl: './exchangeedit.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeEditComponent implements OnInit {
	currentCustomer: any = {};
    planAddForm: FormGroup;
    users: any = [];
    exchangeNames: any = [];
    exchangeTypes = ['Exchange', 'Margin Trading', 'Deposit'];

    formErrors = {
        'exchangeName': '',
        'exchangeType': '',
        'nickName': '',
        'apiKey': '',
        'secretKey': '',
        'user': '',
    };

    validationMessages = {
        'exchangeName': {
            'required':      'Exchange Name is required.',
        },
        'exchangeType': {
            'required':      'Exchange Type is required.',
        },
        'nickName': {
            'required':      'Nick Name is required.',
        },
        'apiKey': {
            'required':      'API Key is required.',
        },
        'secretKey': {
            'required':      'Secret Key is required.',
        },
        'user': {
            'required':      'User is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private exchangeService: ExchangeService,
        private router: Router,
        private exchangeapiService: ExchangeapiService,
        private adminService: AdminService,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            _id: ['', Validators.required],
            exchangeName: ['', Validators.required],
            exchangeType: ['', Validators.required],
            nickName: ['', Validators.required],
            apiKey: ['', Validators.required],
            secretKey: ['', Validators.required],
            user: ['', Validators.required]
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.plan(id);
            this.getUserList();
            this.getApiList();
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

    getApiList(){
        this.exchangeapiService.exchangeapiList().subscribe(
            (data) => {
              if (!data.error) {
                     this.exchangeNames = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
    planUpdate(){ console.log(this.planAddForm.value);
        this.exchangeService.exchangeUpdate(this.planAddForm.value).subscribe(

            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Exchange Account Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/exchange']);
                }else{
                   this._flashMessagesService.show('Exchange API Already Exists', { cssClass: 'alert-danger', timeout: 3000 }); 
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    plan(id){
        this.exchangeService.exchange(id).subscribe(
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