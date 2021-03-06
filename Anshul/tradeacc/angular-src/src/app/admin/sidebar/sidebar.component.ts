import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 constructor(
    private adminService:AdminService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

	onLogoutClick(){
    this.adminService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['admin/login']);
    return false;
  }

}
