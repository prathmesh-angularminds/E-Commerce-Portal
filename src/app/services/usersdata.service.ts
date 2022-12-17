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

    var user: register = {
      name: response.name,
      company: response._org.name,
      email: response.email
    }

    localStorage.setItem('loggedUser', JSON.stringify(user));
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
