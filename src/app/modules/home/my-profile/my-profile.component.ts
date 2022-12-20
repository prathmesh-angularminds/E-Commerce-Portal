import { Component, OnInit } from "@angular/core";
import { UsersdataService } from "src/app/services/usersdata.service";
import { HttpServiceService } from "src/app/services/http-service.service";
import { LoginGuardsGuard } from "src/app/guards/login-guards.guard";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  loggedInUser: any;
  constructor(
    private usersData: UsersdataService,
    private httpService: HttpServiceService
  ) {
    this.getCompanyInfo();
  }

  ngOnInit(): void {}

  userLoggedOut(): void {
    console.log("ErrorComponent");
    this.usersData.clearStorage();
  }

  // Change Password
  changePassword() {

    console.log("error")
    // New Password: ViratK@123
    const url = "/auth/change-password";
    this.httpService.post(url,"",{old_password: "Virat@123",new_password: "ViratK@123"}).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  // Function to get Company Info
  getCompanyInfo() {
    const url: string = "/auth/self";

    this.httpService.get(url).subscribe({
      next: (res) => {
        this.usersData.setUser(res);
        this.loggedInUser = this.usersData.getUser();
        console.log(this.loggedInUser);
      },
      error: err => console.log(err)
    });
  }

  // Email Verification 
  verifyCompanyEmail(): void {
    const url: string = "/auth/";
    const email: string = this.loggedInUser.email;
    console.log(email);

    this.httpService.post(url, email).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  // For Updating company info
  updateCompanyInfo(): void {
    if (!null) {
      this.httpService
        .patch("/users/org", "", {
          name: "Royal Challengers Banglore",
          email: "viratkohli18@gmail.com",
        })
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err),
        });
        this.getCompanyInfo();
    } else {
      console.log("Form is invalid");
    }
  }
}
