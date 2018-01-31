import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class ExchangeapiService {
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

    public exchangeapiList(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'exchangeapi', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public exchangeapi(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'exchangeapi/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public exchangeapiAdd(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'exchangeapi',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public exchangeapiUpdate(data){
        console.log(data);
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.put(globalVariable.url+'exchangeapi/'+data._id,data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public exchangeapiDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete(globalVariable.url+'exchangeapi/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
