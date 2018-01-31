import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class CityService {
    authToken: any;
    
    constructor(private http: Http) { 
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    loadToken(){
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
    
    public citycount(){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'cities', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public cityList(page:Number):any{
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'cityy/'+page, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public cityAdd(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'cities',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public city(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'city/'+id, {headers: headers})
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
            return this.http.post(globalVariable.url+'upload/', input, {headers: headers})
            .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public cityUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.put(globalVariable.url+'cities/'+data._id,data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public cityDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('x-access-token', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete(globalVariable.url+'cities/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
