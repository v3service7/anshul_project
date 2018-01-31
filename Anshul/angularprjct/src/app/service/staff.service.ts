import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class StaffService {
    
    constructor(private http: Http) { }

    public staffList(){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);*/
        return this.http.get(globalVariable.url+'api/staff')
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public staff(id){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);*/
        return this.http.get(globalVariable.url+'api/staff/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public staffAdd(data){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);*/
        return this.http.post(globalVariable.url+'api/staff',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public staffUpdate(data){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);*/
        return this.http.put(globalVariable.url+'api/staff/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public staffDelete(id){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);*/
        return this.http.delete(globalVariable.url+'api/staff/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
