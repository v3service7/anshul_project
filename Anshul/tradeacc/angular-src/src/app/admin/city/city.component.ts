import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

/*service*/
import { CitiesService} from '../../services/cities.service';

@Component({
  selector: 'app-admin-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
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
    cities: any=[];
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private cityService: CitiesService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
        this.getList()
    }

    getList(){
        this.cityService.cityList().subscribe(
            (data) => {
              if (!data.error) {
                     this.cities = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private deletecity(id) {
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
    cityAddForm: FormGroup;

    formErrors = {
        'cityname': '',
        'state': '',
        'description': '',
    };

    validationMessages = {
        'cityname': {
            'required':      'Cityname is required.',
        },
        'state': {
            'required':      'State is required.',
        },
        'description': {
            'required':      'Description is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private cityService: CitiesService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.cityAddForm = this.lf.group({
            cityname: ['', Validators.required],
            state: ['', Validators.required],
            description: [''],
        });
        this.cityAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    cityAdd(){
        this.cityService.cityAdd(this.cityAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['admin/city']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.cityAddForm) {return;  }
        const form = this.cityAddForm;

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
  selector: 'app-admin-city-edit',
  templateUrl: './cityedit.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityEditComponent implements OnInit {
    currentAdmin: any = {};
  currentCustomer: any = {};
    cityAddForm: FormGroup;

    formErrors = {
        'cityname': '',
        'state': '',
        'description': '',
    };

    validationMessages = {
        'cityname': {
            'required':      'Cityname is required.',
        },
        'state': {
            'required':      'State is required.',
        },
        'description': {
            'required':      'Description is required.',
        },
    };

    constructor(
        private lf: FormBuilder, 
        private cityService: CitiesService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.cityAddForm = this.lf.group({
            _id: ['', Validators.required],
            cityname: ['', Validators.required],
            state: ['', Validators.required],
            description: [''],
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.city(id);
        });    

        this.cityAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    cityUpdate(){
      
        this.cityService.cityUpdate(this.cityAddForm.value).subscribe(
            (data) => {
              console.log(data);
              if (!data.error) {
                  this.router.navigate(['admin/city']);
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
                  this.cityAddForm.patchValue(this.currentCustomer);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.cityAddForm) {return;  }
        const form = this.cityAddForm;

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