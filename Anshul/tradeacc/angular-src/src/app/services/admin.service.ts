import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from "../global";

@Injectable()
export class AdminService {
  
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');    
    return this.http.post(globalVariable.url+'users/login', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.get(globalVariable.url+'users/profile',{headers: headers})
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

  userUpdate(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.put(globalVariable.url+'users/'+user._id, user, {headers: headers})
      .map(res => res.json());
  }

  public changePassword(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json'); 
    return this.http.put(globalVariable.url+'users/customer-change-password/'+user._id, user, {headers: headers})
      .map(res => res.json());
    }

    public adminForgetPassword(data){
        return this.http.post(globalVariable.url+'users/forget-password', data)
        .map(res =>  res.json());
    }

  storeUserData(token, user){
    localStorage.setItem('id_token_admin', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token_admin');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token_admin');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
