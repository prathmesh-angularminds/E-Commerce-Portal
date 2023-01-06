import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//////////////////////////// Service to work on users data
export class UsersdataService {

  constructor(private router: Router) {}
  updateDetails: Subject<boolean> = new BehaviorSubject<boolean>(false);

  // get user from local storage
  getUser(type: string) {
    let data = localStorage.getItem(type)!
    return JSON.parse(data);
  }

  setUser(response: any,type: string) {

    localStorage.setItem(type, JSON.stringify(response));
  }

  setToken(token: string,type: string) {

    localStorage.setItem(type,token)
  }

  getToken(type: string) {
    return localStorage.getItem(type)
  }

  clearStorage() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    this.router.navigate(['/auh/login'])
  }
}

export interface register {
  name: string;
  email: string;
  company: string;
}
