import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class ExchangeService {
    authToken: any;
    
    constructor(private http: Http) { 
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    loadToken(){
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    public exchangeList(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'exchange', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public exchange(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'exchange/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public exchangeAdd(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'exchange',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public exchangeUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.put(globalVariable.url+'exchange/'+data._id,data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public exchangeDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete(globalVariable.url+'exchange/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
