import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

	email: String;

  	constructor(
  		private flashMessage:FlashMessagesService,
	    private userService:UserService,
	    private router: Router
	) { }

  	ngOnInit() {
  		if(this.userService.loggedIn()){
	    	this.router.navigate(['profile']);
	    }
  	}

  	forgotPassword(){
  		
      const user = {
		    email: this.email
    	}

      this.userService.forgotPassword(user).subscribe( (data) => {
        	if(!data.error){
		        this.flashMessage.show("Please check your email to reset the password", {cssClass: 'alert-success', timeout: 5000});
		        this.router.navigate(['/login']);
		    } else {
		        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});		        
		    }
		  });
  }

}



@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ResetComponent implements OnInit {

  password: String;
  cpassword: String;
  id : any;

    constructor(
      private flashMessage:FlashMessagesService,
      private userService:UserService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

    ngOnInit() { 
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
      });
    }

    resetPassword(){

        if (this.password == this.cpassword) {
            let usrObj = {};
            usrObj['_id']=this.id;
            usrObj['password'] = this.password;
            this.userService.resetPassword(usrObj).subscribe((data)=>{
                if (!data.error) {
                  this.flashMessage.show(data.message, {
                cssClass: 'alert-success',
                timeout: 5000});
                    this.router.navigate(['/login']);
                }else{
                    this.flashMessage.show('Something Went Wrong', { cssClass: 'alert-danger', timeout: 5000 });
                }
            });
        }else{
            this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 5000 });
            return false;
        }
    }

}
