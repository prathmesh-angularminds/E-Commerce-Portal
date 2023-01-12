import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cust-navbar',
  templateUrl: './cust-navbar.component.html',
  styleUrls: ['./cust-navbar.component.scss']
})
export class CustNavbarComponent implements OnInit {

  demo: Router

  constructor(private router: Router) { 
    this.demo = this.router;
  }

  ngOnInit(): void {
  }

  // Logout Customer
  logoutCustomer() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
}
