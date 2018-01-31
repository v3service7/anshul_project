import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./user.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-admin-user-add',
  templateUrl: './useradd.component.html',
  styleUrls: ['./user.component.css']
})
export class UserAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./user.component.css']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
