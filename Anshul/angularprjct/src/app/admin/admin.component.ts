import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	currentCustomer: any = {};
  	constructor() { 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  ngOnInit() {}
}