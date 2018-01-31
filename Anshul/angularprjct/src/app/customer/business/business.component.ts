import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import * as globalVariable from "../../global";

/*service*/
import { CustomerService, BusinessService, PlanService} from '../../service/index';

@Component({
  selector: 'app-customer-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessComponent implements OnInit {
    currentCustomer: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute
    ){ 
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {}
}

@Component({
  selector: 'app-admin-business-list',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessListComponent implements OnInit {
    currentCustomer: any = {};
    businesses: any=[];
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.customer(this.currentCustomer._id);
        }); 
    }

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentCustomer = data.message;
                  this.getList(this.currentCustomer._id);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getList(id){
        this.businessService.businessList(id).subscribe(
            (data) => {
              if (!data.error) {
                     this.businesses = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private deleteBusiness(id) {
        if(confirm("Are you sure to delete ?")) {
            this.businessService.businessDelete(id).subscribe(data => {
                this.getList(this.currentCustomer._id);
            });
        }
    }
}

@Component({
  selector: 'app-customer-business-add',
  templateUrl: './businessadd.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessAddComponent implements OnInit {
    currentCustomer: any = {};
    plans: any = [];
    isVisit = false;
    businessAddForm: FormGroup;
    
    formErrors = {
        'businessName': '',
        'tradeLicenseNumber': '',
        'tradeLicenseExpiry' : '',
        'emiRate' : '',
        'phoneNumber' : '',
        'ownerName' : '',
        'mobileNumber' : '',
        'passportNumber' : '',
        'nationality' : '',
        'emiRateIdNumber' : '',
    };

    validationMessages = {
        'businessName': {
            'required':      'Name is required.',
        },
        'tradeLicenseNumber': {
            'required':      'Trade License Number is required.',
        },
        'emiRate': {
            'required':      'Emi Rate is required.',
        },
        'tradeLicenseExpiry' : {
            'required':      'Trade License Expiry is required.',
        }, 
        'phoneNumber' : {
            'required':      'Phone Number is required.'
        },
        'ownerName' : {
            'required':      'Owner Name is required.'
        },
        'mobileNumber' : {
            'required':      'Mobile Number is required.'
        },   
        'passportNumber' : {
            'required':      'Passport Number is required.'
        },   
        'nationality' : {
            'required':      'Nationality is required.'
        },   
        'emiRateIdNumber' : {
            'required':      'EMI Rate Id Number is required.'
        },           
    };

    constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private customerService: CustomerService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {
        this.businessAddForm = this.lf.group({
            businessName: ['', Validators.required],
            typeOfOrg: [''],
            tradeLicenseNumber: ['', Validators.required],
            issuingAuthority: [''],
            tradeLicenseExpiry: ['', Validators.required],
            emiRate: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            ownerName: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            passportNumber: ['', Validators.required],
            nationality: ['', Validators.required],
            emiRateIdNumber: ['', Validators.required],
            ownerId: ['', Validators.required],
            plan: ['', Validators.required],
            bankName: [''],
            bankBranch: [''],
            bankAccountNumber: [''],
            certificateOfIncorporationNo: [''],
            vattrn: [''],
            siteVisit: [''],
            noDaysRequired: [''],

            /*passportFile: [''],
            visaFile: [''],
            emiRatesIdFile: [''],
            tradeLicenseFile: [''],
            articleAndPartnershipFile: [''],
            certificateOfIncorporationFile: [''],
            bankStatementFile: [''],*/
        });

        this.customer(this.currentCustomer._id);

        this.businessAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getPlanList();
    }

    checkIsVisit(){
        if (this.businessAddForm.value.siteVisit != 'AED 0') {
            this.isVisit = true
        }
    }

    getPlanList(){
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


    businessAdd(){
        this.businessService.businessAdd(this.businessAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['customer/business/document-update',data.message._id]);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
            if (!data.error) {
                console.log(data)
                this.currentCustomer = data.message;
                let name = this.currentCustomer.firstname+' '+this.currentCustomer.lastname
                this.businessAddForm.controls["ownerName"].setValue(name);
                this.businessAddForm.controls["mobileNumber"].setValue(this.currentCustomer.phonenumber);
                this.businessAddForm.controls["ownerId"].setValue(data.message._id);
            }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.businessAddForm) {return;  }
        const form = this.businessAddForm;
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
  selector: 'app-admin-business-document',
  templateUrl: './businessdocument.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessDocumentComponent implements OnInit {
    currentCustomer: any = {};
    businesses: any={};
    returnUrl: string;
    err:any;
    businessAddForm: FormGroup;
    imgUrl = globalVariable.imageUrl;

    public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

    constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      }

    ngOnInit() {
        this.businessAddForm = this.lf.group({
            _id: ['', Validators.required],
            
            passportFile: [''],
            visaFile: [''],
            emiRatesIdFile: [''],
            tradeLicenseFile: [''],
            articleAndPartnershipFile: [''],
            certificateOfIncorporationFile: [''],
            bankStatementFile: [''],
        });
        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.business(id);
        });
    }

    onChange(event,fileType) {
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.businessAddForm.controls[fileType].setValue(responsePath.filename);
            this.businesses[fileType]= responsePath.filename;
        };
    }

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentCustomer = data.message;
                  this.getList(this.currentCustomer._id);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    business(id){
        this.businessService.business(id).subscribe(
            (data) => {
            if (!data.error) {
                this.businessAddForm.patchValue(data.message);
                this.businesses = data.message;
                //console.log(this.businesses)
            }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }


    businessDocument(){
        console.log(this.businessAddForm.value)
        this.businessService.businessUpdate(this.businessAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['customer/business']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getList(id){
        this.businessService.businessList(id).subscribe(
            (data) => {
              if (!data.error) {
                     this.businesses = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}

@Component({
  selector: 'app-admin-business-edit',
  templateUrl: './businessedit.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessEditComponent implements OnInit {
    currentCustomer: any = {};
    plans: any = [];
    isVisit = false;
    businessAddForm: FormGroup;
    
    formErrors = {
        'businessName': '',
        'tradeLicenseNumber': '',
        'tradeLicenseExpiry' : '',
        'emiRate' : '',
        'phoneNumber' : '',
        'ownerName' : '',
        'mobileNumber' : '',
        'passportNumber' : '',
        'nationality' : '',
        'emiRateIdNumber' : '',
    };

    validationMessages = {
        'businessName': {
            'required':      'Name is required.',
        },
        'tradeLicenseNumber': {
            'required':      'Trade License Number is required.',
        },
        'emiRate': {
            'required':      'Emi Rate is required.',
        },
        'tradeLicenseExpiry' : {
            'required':      'Trade License Expiry is required.',
        }, 
        'phoneNumber' : {
            'required':      'Phone Number is required.'
        },
        'ownerName' : {
            'required':      'Owner Name is required.'
        },
        'mobileNumber' : {
            'required':      'Mobile Number is required.'
        },   
        'passportNumber' : {
            'required':      'Passport Number is required.'
        },   
        'nationality' : {
            'required':      'Nationality is required.'
        },   
        'emiRateIdNumber' : {
            'required':      'EMI Rate Id Number is required.'
        },           
    };

    constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private customerService: CustomerService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {
        this.businessAddForm = this.lf.group({
            _id: ['', Validators.required],
            businessName: ['', Validators.required],
            typeOfOrg: [''],
            tradeLicenseNumber: ['', Validators.required],
            issuingAuthority: [''],
            tradeLicenseExpiry: ['', Validators.required],
            emiRate: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            ownerName: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            passportNumber: ['', Validators.required],
            nationality: ['', Validators.required],
            emiRateIdNumber: ['', Validators.required],
            ownerId: ['', Validators.required],
            plan: ['', Validators.required],
            bankName: [''],
            bankBranch: [''],
            bankAccountNumber: [''],
            certificateOfIncorporationNo: [''],
            vattrn: [''],
            siteVisit: [''],
            noDaysRequired: [''],

            /*passportFile: [''],
            visaFile: [''],
            emiRatesIdFile: [''],
            tradeLicenseFile: [''],
            articleAndPartnershipFile: [''],
            certificateOfIncorporationFile: [''],
            bankStatementFile: [''],*/
        });
        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.business(id);
        });

        this.customer(this.currentCustomer._id);

        this.businessAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getPlanList();
    }

    checkIsVisit(){
        if (this.businessAddForm.value.siteVisit != 'AED 0') {
            this.isVisit = true
        }
    }

    getPlanList(){
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


    businessUpdate(){
        this.businessService.businessUpdate(this.businessAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.router.navigate(['customer/business']);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
            if (!data.error) {
                console.log(data)
                this.currentCustomer = data.message;
                let name = this.currentCustomer.firstname+' '+this.currentCustomer.lastname
                this.businessAddForm.controls["ownerName"].setValue(name);
                this.businessAddForm.controls["mobileNumber"].setValue(this.currentCustomer.phonenumber);
                this.businessAddForm.controls["ownerId"].setValue(data.message._id);
            }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    business(id){
        this.businessService.business(id).subscribe(
            (data) => {
            if (!data.error) {
                console.log(data)
                /*this.currentCustomer = data.message;
                let name = this.currentCustomer.firstname+' '+this.currentCustomer.lastname
                this.businessAddForm.controls["ownerName"].setValue(name);
                this.businessAddForm.controls["mobileNumber"].setValue(this.currentCustomer.phonenumber);*/
                this.businessAddForm.patchValue(data.message);
            }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.businessAddForm) {return;  }
        const form = this.businessAddForm;
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