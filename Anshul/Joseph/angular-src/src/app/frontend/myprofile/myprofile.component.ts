import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {UserService} from '../../services/user.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ExchangeService} from '../../services/exchange.service';
import { PlanService} from '../../services/plan.service';
import { PurchaseplanService} from '../../services/purchaseplan.service';
import { ExchangeapiService} from '../../services/exchangeapi.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
	exchangeNames: any=[];
    exchangeTypes = ['Exchange', 'Margin Trading', 'Deposit'];
	plans: any=[];
	plansType: any=[];
	accountplansType: any=[];
	user:any;
	firstname: String;
	lastname: String;
	email: String; 
	username: String; 
	phonenumber: String; 
	password: any = "";
  	newpassword: any = "";
  	exchangeName: String;
  	nickName: String;
  	exchangeType: String;
  	apiKey: String;
  	secretKey: String;
  	id:any;
  	sid:string;
  	newex : any = false;
  	isActive : any = 'profile';
  	constructor(
  		private validateService: ValidateService,
	    private flashMessage:FlashMessagesService,
	    private exchangeService: ExchangeService,
	    private exchangeapiService: ExchangeapiService,
	    private userService:UserService,
	    private planService: PlanService,
	    private purchaseplanService: PurchaseplanService,
	    private router: Router,
	    private activatedRoute: ActivatedRoute
  	) { }

  	ngOnInit() {
	  	this.userService.getProfile().subscribe(profile => {
			this.id = profile.user._id;   
			this.user = profile.user;	  
			this.firstname = this.user.firstname; 
			this.lastname = this.user.lastname; 
			this.email = this.user.email; 
			this.username = this.user.username; 
			this.phonenumber = this.user.phonenumber;  
			this.plangetList();
			this.accountgetList();
			this.getList() ;
			this.getApiList();
	    },
	    err => {
	      console.log(err);
	      return false;
	    });
		 this.user = JSON.parse(localStorage.getItem('user'));
    }

    setActive(current,my){
    	if (current == my) {
    		return 'activeClass';
    	}
    }

    setActiveClass(name){
      	this.isActive = name;
    }

  	onProfileSubmit(){
	    const userProfile = {
			  firstname: this.firstname,
			  lastname: this.lastname,
			  email: this.email,
			  username: this.username,
			  phonenumber: this.phonenumber,
			  _id: this.id
	    }
	    // Required Fields
	    if(!this.validateService.validateProfile(userProfile)){
	      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
	      return false;
	    }
	    // Validate Email
	    if(!this.validateService.validateEmail(userProfile.email)){
	      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
	      return false;
	    }
	    // Update User Profile
	    this.userService.updateProfile(userProfile).subscribe(data => {		
	      if(!data.error){
	        this.flashMessage.show('Profile Updated Successfully', {cssClass: 'alert-success', timeout: 3000});
	        this.router.navigate(['/profile']);
	      } else {
	        this.flashMessage.show('Email/Username already in use', {cssClass: 'alert-danger', timeout: 3000});
	        this.router.navigate(['/profile']);
	      }
	    });
  	}

  	userChangePassword(){
		let obj = {};
	      obj['password'] = this.password;
	      obj['newpassword'] = this.newpassword;
	      obj['id'] = this.id;
			if(this.password != "" && this.newpassword != ""){
			      this.userService.changePassword(obj).subscribe(
		            (data) => {            
		              if (!data.error) {
							this.flashMessage.show('Password Updated Successfully', {cssClass: 'alert-success', timeout: 3000});
							this.router.navigate(['/profile']);
							this.password = "";
							this.newpassword = "";
		               	}else{
							this.flashMessage.show('Current password is wrong', {cssClass: 'alert-danger', timeout: 3000});
							this.router.navigate(['/profile']);
							this.password = "";
							this.newpassword = "";
		                }
		            },
		            (err)=>{
		                this.flashMessage.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
		                console.log('kfgbhj');
		            }
		        );
		    }else{
		    	this.flashMessage.show('Please fill current/change password', {cssClass: 'alert-danger', timeout: 3000});
	 
		    }
  	}

  	getList(){
        this.exchangeService.customerexchangeList(this.id).subscribe(
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
    planAdd(){
    	const Addplan = {
			  nickName: this.nickName,
			  exchangeName: this.exchangeName,
			  exchangeType: this.exchangeType,
			  apiKey: this.apiKey,
			  secretKey: this.secretKey,
			  user: this.id
	    }
        if(!this.validateService.validateaddplan(Addplan)){
	      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
	      return false;
	    }
        this.exchangeService.exchangeAdd(Addplan).subscribe(
            (data) => {
              if (!data.error) {
              		this.getList();
					document.getElementById('v-pills-exchange-tab').click();
					this.flashMessage.show('Exchange Account Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
					this.router.navigate(['/profile']);
                }else{
                    this.flashMessage.show('Exchange API Already exists', { cssClass: 'alert-danger', timeout: 3000 });
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    editPlan(data) {
		if(data){
			this.sid= data._id;
			this.nickName = data.nickName;   
			this.exchangeName = data.exchangeName._id;   
			this.exchangeType = data.exchangeType;  
			this.apiKey = data.apiKey;  
			this.secretKey = data.secretKey;
		}
    }

    clearform(){
			this.nickName = "";
			this.exchangeName = "";
			this.exchangeType = "";
			this.apiKey = "";
			this.secretKey = "";
    }

    planUpdate(){
    	const updateplan = {
			_id:this.sid,
			nickName: this.nickName,
			exchangeName: this.exchangeName,
			exchangeType: this.exchangeType,
			apiKey: this.apiKey,
			secretKey: this.secretKey,
			user: this.id
	    }
	    if(!this.validateService.validateaddplan(updateplan) && !updateplan){
	      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
	      return false;
	    }
        this.exchangeService.exchangeUpdate(updateplan).subscribe(
            (data) => {
              if (!data.error) {
					this.getList();
					document.getElementById('v-pills-exchange-tab').click();
					this.flashMessage.show('Exchange Account Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
					this.router.navigate(['/profile']);
                }else{
                   this.flashMessage.show('Exchange API Already Exists', { cssClass: 'alert-danger', timeout: 3000 }); 
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private deletePlan(id) {
        if(confirm("Are you sure to delete ?")) {
				this.flashMessage.show('Exchange Account Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
				this.exchangeService.exchangeDelete(id).subscribe(data => {
				this.getList();
            });
        }
    }

    plangetList(){
        this.planService.planList().subscribe(
            (data) => {
              if (!data.error) {
                     this.plansType = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

  	private purchasePlan(data) {
  		let obj = {};
  		var x = parseInt(data.planType) ;
		var current = new Date();
		var threeMonthsInTheFuture =  new Date(new Date(current).setMonth(current.getMonth() + x));
	      obj['plan'] = data._id;
	      obj['expireddate'] = threeMonthsInTheFuture;
	      obj['user'] = this.id;
	  		if(confirm("Are you sure to purchase plan?")) {
	  			this.purchaseplanService.paymentplan(data).subscribe(
		            (data) => {
		            	if(!data.error){
		            		window.location.href = data.paymentlink;
		            		this.purchaseplanService.puchaseplan(obj).subscribe(data => {
	            			});
		            	}
		            },
		            (err)=>{
		                console.log('kfgbhj')
		            }
		        );
	        }
  	}

	accountgetList(){
        this.purchaseplanService.accountList(this.id).subscribe(
            (data) => {
              if (!data.error) {
                     this.accountplansType = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}