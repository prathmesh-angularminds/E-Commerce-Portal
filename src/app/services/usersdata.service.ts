import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//////////////////////////// Service to work on users data
export class UsersdataService {
  // Stores data of Logged in users
  // loggedInUser: register = {
  //   fullName: '',
  //   companyName: '',
  //   password: '',
  //   email: '',
  //   token: ''
  // };

  constructor() {}

  // get users list from local storage  
  getUsersList() {
    
    let user = localStorage.getItem('registeredUserList');
    
    if (user === null) {
      localStorage.setItem('registeredUserList', JSON.stringify([]));
      return [];
    } else {
      return JSON.parse(user);
    }
  }

  // get user from local storage
  getUser() {

    let user = localStorage.getItem('loggedUser');

    if(user === null) {
      return user;
    } else {
      return JSON.parse(user);
    }
  }

  setUser(user: register) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  // set local storage data
  setUsersList(userData: register) {
 
    let list = this.getUsersList();
    list.push(userData);

    localStorage.setItem('registeredUserList', JSON.stringify(list));
  }
}

interface register {
  fullName: string;
  email: string;
  companyName: string;
  password: string;
  token: string;
}
