import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

/*service*/
import { ExchangeService} from '../../services/exchange.service';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-admin-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class AdminExchangeComponent implements OnInit {
    currentAdmin: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute
    )
    { 
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {}
}

@Component({
  selector: 'app-admin-exchange-list',
  templateUrl: './exchangelist.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeListComponent implements OnInit {
    currentAdmin: any = {};
    plans: any=[];
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private exchangeService: ExchangeService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
        this.getList()
    }

    getList(){
        this.exchangeService.exchangeList().subscribe(
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
    currentAdmin: any = {};
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
            'required':      'Nick name is required.',
        },
        'apiKey': {
            'required':      'API Key is required.',
        },
        'secretKey': {
            'required':      'Secret key is required.',
        },
        'user': {
            'required':      'User is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private exchangeService: ExchangeService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

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
        this.exchangeService.exchangeAdd(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['admin/exchange']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getUserList(){
        this.userService.userList().subscribe(
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
  selector: 'app-admin-exchange-edit',
  templateUrl: './exchangeedit.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeEditComponent implements OnInit {
    currentAdmin: any = {};
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
            'required':      'Nick name is required.',
        },
        'apiKey': {
            'required':      'API Key is required.',
        },
        'secretKey': {
            'required':      'Secret key is required.',
        },
        'user': {
            'required':      'User is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private exchangeService: ExchangeService,
        private router: Router,
        private userService: UserService,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

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
        this.userService.userList().subscribe(
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
                  this.router.navigate(['admin/exchange']);
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