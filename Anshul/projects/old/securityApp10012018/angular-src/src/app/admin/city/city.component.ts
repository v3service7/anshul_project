import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import { FileUploader } from 'ng2-file-upload';
import { CityService} from '../../services/city.service';
import * as globalVariable from "../../global";

@Component({
  selector: 'app-admin-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class AdminCityComponent implements OnInit {
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
  selector: 'app-admin-city-list',
  templateUrl: './citylist.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityListComponent implements OnInit {
    currentAdmin: any = {};
    plans: any;
    returnUrl: string;
    err:any;
    p: number[] = [];
    constructor(
        private lf: FormBuilder, 
        private cityService: CityService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
         this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.getList();
    }
    getList(){  
            
        this.cityService.cityList().subscribe(
            (data) => {
              console.log(data);
              if (!data.error) 
                 this.plans = data.message;
              else
                  this.plans=[];
            },
            (err)=>{
                this.plans=[];
                //console.log('kfgbhj')
            }
        );
    }
    private deletePlan(id) {
        if(confirm("Are you sure to delete ?")) {
            this.cityService.cityDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-city-add',
  templateUrl: './cityadd.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityAddComponent implements OnInit {
    currentAdmin: any = {};
    planAddForm: FormGroup;
    states = ['AK', 'AL', 'AR','AZ', 'CA', 'CO','CT', 'DC', 'DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VA','VI','VT','WA','WI','WV','WX'];
    formErrors = {
        'cityName': '',
        'state': '',
    };

    validationMessages = {
        'cityName': {
            'required':      'City Name is required.',
        },
        'state': {
            'required':      'State is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private cityService: CityService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage:FlashMessagesService
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.planAddForm = this.lf.group({
            cityName: ['', Validators.required],
            state: ['', Validators.required],
        });
        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    cityAdd(){
        this.cityService.cityAdd(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['admin/city']);
                }else{
                    this.flashMessage.show('City Already Exists', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
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
  selector: 'app-admin-citycsv-add',
  templateUrl: './cityaddcsv.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityCsvAddComponent implements OnInit {
    @ViewChild("fileInput") fileInput;
    currentAdmin: any = {};
    csvfileAddForm: FormGroup;

    constructor(
        private lf: FormBuilder, 
        private cityService: CityService,
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
        this.cityService
            .upload(fileToUpload)
            .subscribe((data) => {
                if (!data.error){
                    this.flashMessage.show('file uploaded successfully', {
                    cssClass: 'alert-success',
                    timeout: 5000});
                    this.router.navigate(['admin/city']);
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
        this.csvfileAddForm = this.lf.group({
            single: ['', Validators.required],
        });
    }    
}


@Component({
  selector: 'app-admin-city-edit',
  templateUrl: './cityedit.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityEditComponent implements OnInit {
    currentAdmin: any = {};
	currentCustomer: any = {};
    planAddForm: FormGroup;
    states = ['AK', 'AL', 'AR','AZ', 'CA', 'CO','CT', 'DC', 'DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VA','VI','VT','WA','WI','WV','WX'];
    formErrors = {
        'cityName': '',
        'state': '',
    };

    validationMessages = {
        'cityName': {
            'required':      'City Name is required.',
        },
        'state': {
            'required':      'State is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private cityService: CityService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage:FlashMessagesService
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.planAddForm = this.lf.group({
            _id: ['', Validators.required],
            cityName: ['', Validators.required],
            state: ['', Validators.required],
            desc: [''],
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.city(id);
        });    

        this.planAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    cityUpdate(){
        this.cityService.cityUpdate(this.planAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['admin/city']);
                }else{
                    this.flashMessage.show('City Already Exists', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    city(id){
        this.cityService.city(id).subscribe(
            (data) => {
              if (!data.error) {
                  console.log(data);
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