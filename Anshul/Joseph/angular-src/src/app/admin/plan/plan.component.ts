import { Component, OnInit } from '@angular/core';
import { TinymceModule } from 'angular2-tinymce';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PlanService} from '../../services/plan.service';
declare var tinymce: any;
@Component({
  selector: 'app-admin-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class AdminPlanComponent implements OnInit {

    constructor() {}

    ngOnInit() {}
}

@Component({
  selector: 'app-admin-plan-list',
  templateUrl: './planlist.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanListComponent implements OnInit {
    plans: any=[];
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.getList()
    }

    getList(){
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

    private deletePlan(id) {
        if(confirm("Are you sure to delete ?")) {
            this._flashMessagesService.show('Plan Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
            this.planService.planDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-plan-add',
  templateUrl: './planadd.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanAddComponent implements OnInit {
    planAddForm: FormGroup;

    formErrors = {
        'name': '',
        'amount': '',
        'planType': '',
    };

    validationMessages = {
        'name': {
            'required':      'Plan Name is required.',
        },
        'amount': {
            'required':      'Amount is required.',
        },
        'planType': {
            'required':      'Plan Type is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            name: ['', Validators.required],
            amount: ['', Validators.required],
            planType: ['', Validators.required],
            desc: [''],
        });
        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    planAdd(){
        this.planService.planAdd(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Plan Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                  this.router.navigate(['admin/plan']);
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
  selector: 'app-admin-plan-edit',
  templateUrl: './planedit.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanEditComponent implements OnInit {
	currentCustomer: any = {};
    planAddForm: FormGroup;

    formErrors = {
        'name': '',
        'amount': '', 
        'planType': '',
    };

    validationMessages = {
        'name': {
            'required':      'Plan Name is required.',
        },
        'amount': {
            'required':      'Amount is required.',
        },
        'planType': {
            'required':      'Amount is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            _id: ['', Validators.required],
            name: ['', Validators.required],
            amount: ['', Validators.required],
            planType: ['', Validators.required],
            desc: [''],
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.plan(id);
        });    

        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    planUpdate(){
        this.planService.planUpdate(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Plan Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                  this.router.navigate(['admin/plan']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    plan(id){
        this.planService.plan(id).subscribe(
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