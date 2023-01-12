import { Component, OnInit } from "@angular/core";
import { UsersdataService } from "src/app/services/usersdata.service";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-customers-profile",
  templateUrl: "./customers-profile.component.html",
  styleUrls: ["./customers-profile.component.scss"],
})
export class CustomersProfileComponent implements OnInit {
  demo: Router;
  customerInfo: any;
  constructor(
    private userData: UsersdataService,
    private router: Router,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.userData.updateDetails.subscribe((data) => {
      if (data === true) {
        this.getCustomer();
      }
    });

    this.getCustomer();
    this.demo = this.router;
  }

  // Get User
  getCustomer() {

    const url = "/shop/auth/self"
    this.httpService.get(url,"").subscribe({
      next: (res: any) => this.customerInfo = res,
      error: (err: any) => console.log(err)
    })
  }

  // Logout Customer
  logoutCustomer() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
}
