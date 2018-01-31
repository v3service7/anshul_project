import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CityService} from '../../services/city.service';
import { CountyService} from '../../services/county.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	currentAdmin: any = {};
    city: any=[];
    county: any=[];
    returnUrl: string;
    err:any;
    constructor(
        private lf: FormBuilder, 
        private cityService: CityService,
        private countyService: CountyService,
    		private router: Router,
    		private route: ActivatedRoute
    ){ 
         this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

  ngOnInit() {
  	this.getList()
  	this.getcountyList()
  }
  getList(){
        this.cityService.citycount().subscribe(
            (data) => {
            	console.log(data)
              if (!data.error) {
                     this.city = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getcountyList(){
        this.countyService.countyList().subscribe(
            (data) => {
            	console.log(data)
              if (!data.error) {
                     this.county = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}
