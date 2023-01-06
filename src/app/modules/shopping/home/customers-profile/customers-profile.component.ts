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
      if (data === true)
        this.customerInfo = this.userData.getUser("customerLogged");
    });

    this.customerInfo = this.userData.getUser("customerLogged");
    this.demo = this.router;
  }

  // Delete Account
  deleteAccount() {
    const url = "/customers/account";
    this.httpService.delete(url).subscribe({
      next: (res) => {
        localStorage.clear();
        this.router.navigate(["/auth/login"]);
      },
      error: (err) => {},
    });
  }

  // Logout Customer
  logoutCustomer() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
}
