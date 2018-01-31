import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ExchangeService} from '../../services/exchange.service';
import { AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class CustomerExchangeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@Component({
  selector: 'app-customer-exchange-add',
  templateUrl: './exchangesadd.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class CustomerexchangeAddComponent implements OnInit {
    users: any = [];
    exchangeNames = ['API1', 'API2', 'API3', 'API4', 'API5'];
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
  selector: 'app-customer-exchange-edit',
  templateUrl: './exchangesedit.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class CustomerexchangeEditComponent implements OnInit {
	currentCustomer: any = {};
    planAddForm: FormGroup;
    users: any = [];
    exchangeNames = ['API1', 'API2', 'API3', 'API4', 'API5'];
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