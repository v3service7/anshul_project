import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined || user.password == undefined ){
      return false;
    } else {
      return true;
    }
  }

  validateProfile(user){
    if(user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateaddplan(plan){
    if(plan.nickName == undefined || plan.exchangeName == undefined || plan.exchangeType == undefined || plan.apiKey == undefined || plan.secretKey == undefined){
      return false;
    } else {
      return true;
    }
  }
}
