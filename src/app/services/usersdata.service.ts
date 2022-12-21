import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//////////////////////////// Service to work on users data
export class UsersdataService {

  constructor() {}

  // get user from local storage
  getUser() {
    let data = localStorage.getItem('loggedUser')!
    return JSON.parse(data);
  }

  setUser(response: any) {

    localStorage.setItem('loggedUser', JSON.stringify(response));
  }

  setToken(token: string) {

    console.log(typeof(token))
    localStorage.setItem('token',token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  clearStorage() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
  }
}

export interface register {
  name: string;
  email: string;
  company: string;
}
