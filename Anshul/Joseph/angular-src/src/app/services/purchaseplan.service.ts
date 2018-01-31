import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class PurchaseplanService {
    authToken: any;
    
    constructor(private http: Http) { 
        if(localStorage.getItem('id_token_admin')){
            const token = localStorage.getItem('id_token_admin');
                this.authToken = token;
            }
       if(localStorage.getItem('id_token')){
            const token = localStorage.getItem('id_token');
                this.authToken = token;
            } 
        }   

    loadToken(){
        if(localStorage.getItem('id_token_admin')){
            const token = localStorage.getItem('id_token_admin');
                this.authToken = token;
            }
       if(localStorage.getItem('id_token')){
            const token = localStorage.getItem('id_token');
                this.authToken = token;
            }
    } 

    public puchaseplan(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'purchaseplan',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public updatepuchaseplan(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');    
        return this.http.put(globalVariable.url+'purchaseplan/'+data.id, data, {headers: headers})
          .map(res => res.json());
    }
    
    public paymentplan(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'pay',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public getsuccess(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'pay/success',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public getcancel(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'pay/cancel', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public accountList(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'purchaseplan/'+data , {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public accountdetailList(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'purchaseplan' , {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

 }