import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {UserService} from '../../services/user.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	firstname: String;
  lastname: String;
  email: String; 
  username: String; 
  password: String; 
  check: any=""; 
  
  constructor(
  	private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
		  firstname: this.firstname,
		  lastname: this.lastname,
		  email: this.email,
		  username: this.username,
      password: this.password,
		  check: this.check 
    }
    console.log(user);
    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    if(user.check!=""){
      this.userService.registerUser(user).subscribe(data => {
      if(!data.error){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Email/Username already in use', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/signup']);
      }
    });
    }else{
      this.flashMessage.show('Please Check Checkbox', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

  }

}
