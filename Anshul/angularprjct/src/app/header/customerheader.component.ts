import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

/*service*/
import { CustomerService} from '../service/index';

@Component({
  	selector: 'app-customer-sidebar',
  	templateUrl: './customersidebar.component.html',
  	styles: []
})
export class CustomerSidebarComponent implements OnInit {
	currentCustomer: any = {};
  	constructor(
        private customerService: CustomerService,
        private router: Router,
        ) { 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  	ngOnInit() {}

    customerLogout(){
        this.customerService.customerLogout().subscribe(
            (data) => {
              if (!data.error) {
                    localStorage.removeItem('currentCustomer')
                    this.router.navigate(['customer/login']);
                }else{

                }
            },
            (err)=>{
                this.router.navigate(['customer/login']);
            }
        );
    }
}

@Component({
      selector: 'app-customer-header',
      templateUrl: './customerheader.component.html',
      styles: []
})
export class CustomerHeaderComponent implements OnInit {
    currentCustomer: any = {};
      constructor() { 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      }
      ngOnInit() {}
}