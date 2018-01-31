import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from "../global";

@Injectable()
export class UserService {
	authToken: any;

  constructor(private http:Http) { 
  	const token = localStorage.getItem('id_token_admin');
    this.authToken = token;
  }

	userAdd(user){
		let headers = new Headers();
		this.loadToken();
    headers.append('Authorization', this.authToken);
		headers.append('Content-Type','application/json');    
		return this.http.post(globalVariable.url+'users/', user, {headers: headers})
		  .map(res => res.json());
	}

	userUpdate(user){
		let headers = new Headers();
		this.loadToken();
    headers.append('Authorization', this.authToken);
		headers.append('Content-Type','application/json');    
		return this.http.put(globalVariable.url+'users/'+user._id, user, {headers: headers})
		  .map(res => res.json());
	}

	userList(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.get(globalVariable.url+'users/', {headers: headers})
      .map(res => res.json());
  }

  getUserById(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.get(globalVariable.url+'users/'+id, {headers: headers})
      .map(res => res.json());
  }  

  deleteUserById(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.delete(globalVariable.url+'users/'+id, {headers: headers})
      .map(res => res.json());
  }  

  loadToken(){
    const token = localStorage.getItem('id_token_admin');
    this.authToken = token;
  }

}
