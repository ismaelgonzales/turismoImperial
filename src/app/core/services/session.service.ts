import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }


  setSessionVariable(name: string, value: string) {
    sessionStorage.setItem(name, value);
  }

  getSessionVariable(name: string) {
    return sessionStorage.getItem(name);
  }



  setSessionObject(name: string, value: any) {

    sessionStorage.setItem(name, JSON.stringify(value));
  }

  getSessionObject(name: string) {

    let value;
    let jsonUser = sessionStorage.getItem(name);
    if (jsonUser != null && jsonUser != undefined) {
      value = JSON.parse(jsonUser);
    }

    return value;
  }



}
