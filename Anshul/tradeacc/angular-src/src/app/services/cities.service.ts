import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class CitiesService {
    authToken: any;
    headers :any;

    constructor(private http: Http) { 
        this.headers = new Headers();
        this.loadToken();
        this.headers.append('Authorization', this.authToken);
        this.headers.append('Content-Type','application/json');
       
    }

    loadToken(){
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    public cityList(){
        /*let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');*/
        return this.http.get(globalVariable.url+'city', {headers: this.headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public city(id){
     
        return this.http.get(globalVariable.url+'city/'+id, {headers: this.headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public cityAdd(data){
       /* let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');*/
        return this.http.post(globalVariable.url+'city',data, {headers: this.headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public cityUpdate(data){
       /* let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');*/
        return this.http.put(globalVariable.url+'city/'+data._id,data, {headers: this.headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public cityDelete(id){
        /*let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');*/
        return this.http.delete(globalVariable.url+'city/'+id, {headers: this.headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}