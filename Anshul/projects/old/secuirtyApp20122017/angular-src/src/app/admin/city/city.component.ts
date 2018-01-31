import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import { FileUploader } from 'ng2-file-upload';
import { CityService} from '../../services/city.service';
import * as globalVariable from "../../global";
import {Subscription} from 'rxjs';
declare var $ : any;

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
    plans: any=[];
    hi:any = { "counts":''};
    returnUrl: string;
    err:any;
  
    constructor(
        private lf: FormBuilder, 
        private cityService: CityService,
        private router: Router,
        private route: ActivatedRoute
    ){ 

         this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {

        $(document).ready(() => {
       /* $('ul.ng2-pagination > li').click( () =>{
        console.log($("ul.ng2-pagination").children());
        $('ul.ng2-pagination > li').removeAttr();
        $(this).addClass('current');
        });*/

        $(document).on("click", "ul.ng2-pagination > li", function(event){
            $("ul.ng2-pagination").children().removeClass("current").children().css({"padding":"0.1875rem 0.625rem", "color": "black"});
            $(this).addClass("current").children().css({"padding":"0px", "color": "white"});
            })
        });

        this.getcount();
    }
    getList(event){  
        this.cityService.cityList(event).subscribe(
            (data) => {
              console.log(data);
              if (!data.error) {
                 this.plans = data.message;
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
    getcount(){  
        this.cityService.citycount().subscribe(
            (data) => {
              if (!data.error) {
                 this.hi.counts = data.message.length;
                 this.getList(1);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
    private deletePlan(id) {
        if(confirm("Are you sure to delete ?")) {
            this.cityService.cityDelete(id).subscribe(data => {
                this.getList(event);
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