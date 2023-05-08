import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchDataService } from 'src/app/services/search-data.service';
import {UsersdataService} from 'src/app/services/usersdata.service';

@Component({
  selector: 'app-cust-navbar',
  templateUrl: './cust-navbar.component.html',
  styleUrls: ['./cust-navbar.component.scss']
})
export class CustNavbarComponent implements OnInit {

  demo: Router;
  token: any;
  searchValue: string;
  constructor(private router: Router, private userData: UsersdataService,private search: SearchDataService) { 
    this.demo = this.router;
  }
  cartAddedCnt: number = 0;

  ngOnInit(): void {

    if(this.router.url === '/app/cart') {
      this.cartAddedCnt = 0;
    }

    this.getToken();
    this.cartAddedCnt = JSON.parse(localStorage.getItem('cart') || '[]').length;
    console.log(this.cartAddedCnt);
  }
  

  // get token
  getToken() {

    console.log("In get token")
    this.token = this.userData.getToken("customerToken");
    console.log("Token",this.token)
  }

  // Logout Customer
  logoutCustomer() {
    localStorage.removeItem('customerToken');
    this.getToken();
    this.router.navigate(["/app/product/product-list"]);
  }

  searchProduct() {

    this.search.setSearchValue(this.searchValue);
    this.search.searchObserver.next(true);
    if(this.router.url !== '/app/product/product-list')
      this.router.navigate(['/app/product']);
  }
}
