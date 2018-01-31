import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CustomerService} from '../service/index';

@Component({
  selector: 'app-account-active',
  templateUrl: './account-active.component.html',
  styleUrls: ['./account-active.component.css']
})
export class AccountActiveComponent implements OnInit {
token: any;
err= '';
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
      // subscribe to router event
      this.activatedRoute.params.subscribe((params: Params) => {
        this.token = params['token'];
      });
      this.customerService.customerVerify(this.token).subscribe((data) => {
          if (!data.error) { localStorage.setItem('currentCustomer', JSON.stringify(data.message));
          console.log(data);
            this.router.navigate(['customer/login']);
          }else {
            this.err = 'Email already in use';
          }
        },
        (err) => {
          this.router.navigate(['customer/login']);
        }
      );
  }
}

