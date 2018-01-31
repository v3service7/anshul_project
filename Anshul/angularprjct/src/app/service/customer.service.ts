import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class CustomerService {
    constructor(private http: Http) { }

    public customerVerify(data) {
        return this.http.post(globalVariable.url+'customer-verify', {'token':data})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public customerLogin(data){
        return this.http.post(globalVariable.url+'customer-login', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerForgetPassword(data){
        return this.http.post(globalVariable.url+'customer-forget-password', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerList(){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);
        , {headers: headers}*/
        return this.http.get(globalVariable.url+'api/customer')
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customer(id){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);, {headers: headers}*/
        return this.http.get(globalVariable.url+'api/customer/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerAdd(data){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);
        , {headers: headers}*/
        return this.http.post(globalVariable.url+'api/customer',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerUpdate(data){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);, {headers: headers}*/

        return this.http.put(globalVariable.url+'api/customer/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public customerDelete(id){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);, {headers: headers}*/
        return this.http.delete(globalVariable.url+'api/customer/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerChangePassword(data){
        return this.http.put(globalVariable.url+'customer-change-password/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerLogout(){
       /* let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);
        , {headers: headers}*/

        return this.http.get(globalVariable.url+'customer-logout')
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
