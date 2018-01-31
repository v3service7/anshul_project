import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PurchaseplanService} from '../../services/purchaseplan.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  user:any;
  constructor(
		private purchaseplanService: PurchaseplanService,
	    private router: Router,
	    private activatedRoute: ActivatedRoute
  	) { }

  ngOnInit() {
	  	this.user = JSON.parse(localStorage.getItem('user'));
	  	this.activatedRoute.params.subscribe((params: Params) => {
			let obj = {};
			obj['status'] ='Failed';
			obj['id'] = this.user._id;
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
	    })
  	}

}
