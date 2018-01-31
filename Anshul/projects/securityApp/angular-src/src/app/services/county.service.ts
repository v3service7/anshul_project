import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class CountyService {
    authToken: any;
    
    constructor(private http: Http) { 
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    loadToken(){
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    public countyList(){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'counties', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public countyAdd(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'counties',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public county(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'county/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public upload(fileToUpload: any) {
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        let input = new FormData();
            input.append("file", fileToUpload);
            return this.http.post(globalVariable.url+'uploadcounty/', input, {headers: headers})
            .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public countyUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.put(globalVariable.url+'counties/'+data._id,data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public countyDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete(globalVariable.url+'counties/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
