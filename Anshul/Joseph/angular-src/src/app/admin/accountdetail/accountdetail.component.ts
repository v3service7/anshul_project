import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ExchangeService} from '../../services/exchange.service';
import { AdminService} from '../../services/admin.service';
import { PurchaseplanService} from '../../services/purchaseplan.service';

@Component({
  selector: 'app-admin-accountdetail',
  templateUrl: './accountdetail.component.html',
  styleUrls: ['./accountdetail.component.css'],
})
export class AdminAccountdetailComponent implements OnInit {

    constructor() {}
    ngOnInit() {}
}

@Component({
  selector: 'app-admin-accountdetail-list',
  templateUrl: './accountdetaillist.component.html',
  styleUrls: ['./accountdetail.component.css'],
})
export class AccountdetailListComponent implements OnInit {
    plans: any=[];
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private purchaseplanService: PurchaseplanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){}

    ngOnInit() {
        this.getList()
    }

    getList(){
        this.purchaseplanService.accountdetailList().subscribe(
            (data) => {
                console.log(data);
              if (!data.error) {
                     this.plans = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

}