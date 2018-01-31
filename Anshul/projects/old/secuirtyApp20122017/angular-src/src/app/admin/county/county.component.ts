import { Component, OnInit, ViewChild} from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CountyService} from '../../services/county.service';



@Component({
  selector: 'app-admin-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.css'],
})
export class AdminCountyComponent implements OnInit {
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
  selector: 'app-admin-county-list',
  templateUrl: './countylist.component.html',
  styleUrls: ['./county.component.css'],
})
export class CountyListComponent implements OnInit {
    currentAdmin: any = {};
    plans: any = [];
    returnUrl: string;
    err:any;
    p: number[] = [];
    
      constructor(
        private lf: FormBuilder, 
        private countyService: CountyService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
        this.getList();
    }

    getList(){
        this.countyService.countyList().subscribe(
            (data) => {
            	console.log(data)
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
            this.countyService.countyDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-county-add',
  templateUrl: './countyadd.component.html',
  styleUrls: ['./county.component.css'],
})
export class CountyAddComponent implements OnInit {
    currentAdmin: any = {};
    planAddForm: FormGroup;

    formErrors = {
        'countyName': '',
        'state': '',
    };

    validationMessages = {
        'countyName': {
            'required':      'County Name is required.',
        },
        'state': {
            'required':      'State is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private countyService: CountyService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage:FlashMessagesService
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.planAddForm = this.lf.group({
            countyName: ['', Validators.required],
            state: ['', Validators.required],
        });
        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    countyAdd(){
        this.countyService.countyAdd(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['admin/county']);
                }else{
                    this.flashMessage.show('County Already Exists', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
                }
            },
            (err)=>{
                console.log('kfgbhj')
            });
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
  selector: 'app-admin-countycsv-add',
  templateUrl: './countyaddcsv.component.html',
  styleUrls: ['./county.component.css'],
})
export class CountyCsvAddComponent implements OnInit {
    @ViewChild("fileInput") fileInput;
    currentAdmin: any = {};
    csvfileAddForm: FormGroup;
    
    constructor(
        private lf: FormBuilder, 
        private countyService: CountyService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage:FlashMessagesService
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    

    addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.countyService
            .upload(fileToUpload)
            .subscribe((data) => {
                if (!data.error){
                    this.flashMessage.show('file uploaded successfully', {
                    cssClass: 'alert-success',
                    timeout: 5000});
                    this.router.navigate(['admin/county']);
                }else{
                    this.flashMessage.show('please upload csv file,please try again', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
            );
        }
    }

    ngOnInit() {
    }    
}

@Component({
  selector: 'app-admin-county-edit',
  templateUrl: './countyedit.component.html',
  styleUrls: ['./county.component.css'],
})
export class CountyEditComponent implements OnInit {
    currentAdmin: any = {};
    currentCustomer: any = {};
    countyAddForm: FormGroup;

    formErrors = {
        'countyName': '',
        'state': '', 
    };

    validationMessages = {
        'countyName': {
            'required':      'County Name is required.',
        },
        'state': {
            'required':      'State is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private countyService: CountyService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage:FlashMessagesService
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.countyAddForm = this.lf.group({
            _id: ['', Validators.required],
            countyName: ['', Validators.required],
            state: ['', Validators.required],
        });
         
        //var data = {"_id" : "hghj", "countyName" : "fcountyName", "state" : "sdvasgjdg"};
            //this.countyAddForm.patchValue(data);  
        this.route.params.subscribe((params: Params) => {
            let id = params['id']; 
            this.plan(id);
        });    

        this.countyAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    countyUpdate(){
        this.countyService.countyUpdate(this.countyAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['admin/county']);
                }else{
                    this.flashMessage.show('County Already Exists', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    plan(id){
        this.countyService.county(id).subscribe(
            (data) => {
              if (!data.error) {
                  //this.currentCustomer = data.message;
                  this.countyAddForm.patchValue(data.message[0]);
                  
                }},
            (err)=>{
                console.log('kfgbhj')
            });
    }

    onValueChanged(data?: any) {
        if (!this.countyAddForm) {return;  }
        const form = this.countyAddForm;
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