import { Component, OnInit } from '@angular/core';
import { ExchangeService} from '../../services/exchange.service';
import { AdminService} from '../../services/admin.service';
import { PagesService} from '../../services/pages.service';
import { PlanService} from '../../services/plan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	planCount: Number = 0;
	userCount: Number = 0;
	pageCount: Number = 0;
	exchangeCount: Number = 0;

  constructor(
  	private planService: PlanService,
  	private exchangeService: ExchangeService,
  	private pagesService: PagesService,
  	private adminService: AdminService,
  	) { }

  ngOnInit() {
  	this.getPlanList();
  	this.getPageList();
  	this.getExchangeList();
  	this.getUserList();
  }

   getPlanList(){
        this.planService.planList().subscribe(
            (data) => {
              if (!data.error) {
                   this.planCount = data.message.length;
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getPageList(){
        this.pagesService.pageList().subscribe(
            (data) => {
              if (!data.error) {
                   this.pageCount = data.message.length;
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getExchangeList(){
        this.exchangeService.exchangeList().subscribe(
            (data) => {
              if (!data.error) {
                    this.exchangeCount = data.message.length;
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getUserList(){
        this.adminService.userList().subscribe(
            (data) => {
              if (!data.error) {
                    this.userCount = data.message.length;
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }


}
