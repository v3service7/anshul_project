import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PagesService} from '../../services/pages.service';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class AdminPagesComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}

@Component({
  selector: 'app-admin-pages-list',
  templateUrl: './pageslist.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesListComponent implements OnInit {
    plans: any=[];
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private pagesService: PagesService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.getList()
    }

    getList(){
        this.pagesService.pageList().subscribe(
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
            this._flashMessagesService.show('Page Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.pagesService.pageDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-pages-add',
  templateUrl: './pagesadd.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesAddComponent implements OnInit {
    planAddForm: FormGroup;

    formErrors = {
        'title': '',
        'url': '',
    };

    validationMessages = {
        'title': {
            'required':      'Page Title is required.',
        },
        'url': {
            'required':      'URL Text is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private pagesService: PagesService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            title: ['', Validators.required],
            url: ['', Validators.required],
            description: [''],
        });
        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    planAdd(){
        this.pagesService.pageAdd(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Page Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/pages']);
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
  selector: 'app-admin-pages-edit',
  templateUrl: './pagesedit.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesEditComponent implements OnInit {
	currentCustomer: any = {};
    planAddForm: FormGroup;

    formErrors = {
        'title': '',
        'url': '', 
    };

    validationMessages = {
        'title': {
            'required':      'Page Title is required.',
        },
        'url': {
            'required':      'URL Text is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private pagesService: PagesService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.planAddForm = this.lf.group({
            _id: ['', Validators.required],
            title: ['', Validators.required],
            url: ['', Validators.required],
            description: [''],
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
        this.pagesService.pageUpdate(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Page Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/pages']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    plan(id){
        this.pagesService.page(id).subscribe(
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