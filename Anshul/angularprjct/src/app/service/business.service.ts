import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class BusinessService {
    
    constructor(private http: Http) { }

    public businessList(id){
        return this.http.get(globalVariable.url+'api/business-list/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public business(id){
        return this.http.get(globalVariable.url+'api/business/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public businessAdd(data){
        return this.http.post(globalVariable.url+'api/business',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public businessUpdate(data){
        return this.http.put(globalVariable.url+'api/business/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public businessDelete(id){
        return this.http.delete(globalVariable.url+'api/business/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
