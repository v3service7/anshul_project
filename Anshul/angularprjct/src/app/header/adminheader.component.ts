import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

/*service*/
import { AdminService} from '../service/index';

@Component({
  	selector: 'app-admin-sidebar',
  	templateUrl: './adminsidebar.component.html',
  	styles: []
})
export class AdminSidebarComponent implements OnInit {
	currentAdmin: any = {};
  	constructor(
        private adminService: AdminService,
        private router: Router,
        ) { 
  		this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  	}

  	ngOnInit() {}

    adminLogout(){
        this.adminService.adminLogout().subscribe(
            (data) => {
              if (!data.error) {
                    localStorage.removeItem('currentAdmin')
                    this.router.navigate(['admin/login']);
                }else{

                }
            },
            (err)=>{
                this.router.navigate(['admin/login']);
            }
        );
    }
}

@Component({
      selector: 'app-admin-header',
      templateUrl: './adminheader.component.html',
      styles: []
})
export class AdminHeaderComponent implements OnInit {
    currentAdmin: any = {};
      constructor() { 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }
      ngOnInit() {}
}