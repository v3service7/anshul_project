import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class PlanService {
    
    constructor(private http: Http) { }

    public planList(){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.get(globalVariable.url+'api/plan')
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public plan(id){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.get(globalVariable.url+'api/plan/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public planAdd(data){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.post(globalVariable.url+'api/plan',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public planUpdate(data){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.put(globalVariable.url+'api/plan/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public planDelete(id){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.delete(globalVariable.url+'api/plan/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
