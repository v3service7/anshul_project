import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
	currentCustomer: any = {};
  	constructor() { 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  ngOnInit() {}
}