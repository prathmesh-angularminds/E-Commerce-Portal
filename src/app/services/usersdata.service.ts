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
  getUser() {
    let data = localStorage.getItem('loggedUser')!
    return JSON.parse(data);
  }

  setUser(response: any) {

    localStorage.setItem('loggedUser', JSON.stringify(response));
  }

  setToken(token: string) {

    localStorage.setItem('token',token)
  }

  getToken() {
    return localStorage.getItem('token')
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
