import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class PagesService {
    authToken: any;
    
    constructor(private http: Http) { 
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    loadToken(){
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    public pageList(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'page', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public page(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'page/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public pageAdd(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'page',data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public pageUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.put(globalVariable.url+'page/'+data._id,data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public pageDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete(globalVariable.url+'page/'+id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
