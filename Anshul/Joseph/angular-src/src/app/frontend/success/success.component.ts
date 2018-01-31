import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PurchaseplanService} from '../../services/purchaseplan.service';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
	user:any;
  constructor(
		private purchaseplanService: PurchaseplanService,
		private router: Router,
		private activatedRoute: ActivatedRoute
  	) { }

  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem('user'));
	  	this.activatedRoute.queryParams.subscribe((params: Params) => {
		/*					 let paymentId = params['paymentId'];
					        let PayerID = params['PayerID'];
					        let token = params['token'];
					        console.log(paymentId);
					        console.log(PayerID);
					        console.log(token);*/
			let obj = {};
			obj['paymentId'] = params['paymentId'];
			obj['PayerID'] = params['PayerID'];
			obj['status'] ='Success';
			obj['id'] = this.user._id;
			if(params['paymentId'] != 'undefined' && params['PayerID'] != 'undefined' && params['token']!= 'undefined'){
				this.purchaseplanService.getsuccess(params).subscribe(
		            (data) => {
		              if (!data.error) {
		                     this.purchaseplanService.updatepuchaseplan(obj).subscribe(data => {
		                     	//console.log(data);
	            			});
		                }
		            },
		            (err)=>{
		                console.log('kfgbhj')
		            }
		        );
			}
		});
    }


}
