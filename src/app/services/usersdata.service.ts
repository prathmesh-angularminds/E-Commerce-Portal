import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//////////////////////////// Service to work on users data
export class UsersdataService {
  // Stores data of Logged in users
  loggedInUser: register;

  // Stores data of Registered User
  userList: (register)[] = [];

  // Check if user want to route to register
  shouldLogin: boolean = false;
  shouldLogout: boolean = false;

  constructor() {}

  // Setter Method
  setLoggedUser(userData: register) {
    this.userList.push(userData);
    this.loggedInUser = userData;
    this.shouldLogin = !this.shouldLogin;
  }

  // get local storage data 
  getUsersList() {
    
    let user = localStorage.getItem('registeredUserList');
    if (user === null) {
      localStorage.setItem('registeredUserList', JSON.stringify([]));
      return [];
      // return this.userList;
    } else {
      return (this.userList = JSON.parse(user));
    }
  }

  // set local storage data
  setUsersList(userData: register) {
 
    this.setLoggedUser(userData);

    localStorage.setItem('registeredUserList', JSON.stringify(this.userList));
    localStorage.setItem('loggedUser', JSON.stringify(userData));
    
  }

  // This function clear logined users data
  clearLoggedData() {

    this.shouldLogout = !this.shouldLogout;
    this.loggedInUser = {fullName: '', email: '', password: '', companyName: ''}
  }
}

interface register {
  fullName: string;
  email: String;
  companyName: string;
  password: String;
}
