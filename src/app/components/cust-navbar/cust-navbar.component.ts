import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersdataService} from 'src/app/services/usersdata.service';

@Component({
  selector: 'app-cust-navbar',
  templateUrl: './cust-navbar.component.html',
  styleUrls: ['./cust-navbar.component.scss']
})
export class CustNavbarComponent implements OnInit {

  demo: Router;
  token: any;
  constructor(private router: Router, private userData: UsersdataService) { 
    this.demo = this.router;
  }

  ngOnInit(): void {


    this.getToken();
  }

  // get token
  getToken() {

    console.log("In get token")
    this.token = this.userData.getToken("customerToken");
    console.log("Token",this.token)
  }

  // Logout Customer
  logoutCustomer() {
    localStorage.clear();
    this.getToken();
    this.router.navigate(["/app/product/product-list"]);
  }
}
