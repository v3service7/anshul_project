import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

	username: String;
  	password: String;

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

    onLoginSubmit(){
	    const user = {
	      username: this.username,
	      password: this.password
	    }

	    this.userService.validateUser(user).subscribe(data => {
	      if(data.success){
	        this.userService.storeUser(data.token, data.user);
	        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
	        this.router.navigate(['profile']);
	      } else {
	        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
	        this.router.navigate(['login']);
	      }
	    });
  	}

}
