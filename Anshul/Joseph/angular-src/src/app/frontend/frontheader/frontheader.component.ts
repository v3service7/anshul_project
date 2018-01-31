import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-frontheader',
  templateUrl: './frontheader.component.html',
  styleUrls: ['./frontheader.component.css']
})
export class FrontheaderComponent implements OnInit {

  constructor(
  	private userService:UserService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick(){
	  this.userService.logout();
	  this.flashMessage.show('You are logged out', {cssClass:'alert-success', timeout: 3000});
	  this.router.navigate(['/login']);
		return false;
	}

}
