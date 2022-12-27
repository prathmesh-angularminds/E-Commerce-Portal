import { Component, OnInit } from "@angular/core";
import { UsersdataService } from "src/app/services/usersdata.service";
import { HttpServiceService } from "src/app/services/http-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  loggedInUser: any;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };

  constructor(
    private usersData: UsersdataService,
    private httpService: HttpServiceService,
  ) {}

  ngOnInit(): void {
    this.getCompanyInfo();
    this.usersData.updateDetails.subscribe(data => {
      if(data === true)   
        this.getCompanyInfo();
    })
  }

  // Function to get Company Info
  getCompanyInfo() {
    const url: string = "/auth/self";

    this.httpService.get(url).subscribe({
      next: (res) => {
        this.usersData.setUser(res);
        this.loggedInUser = this.usersData.getUser();
        console.log("res profile:",this.loggedInUser);
      },
      error: (err) => console.log(err),
    });
  }

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  // Email Verification
  verifyCompanyEmail(): void {
    const url: string = `/auth/send-verification-email`;

    this.httpService.post(url).subscribe({
      next: (res) => {
        this.showPop("Mail is send in Ethereal");
      },
      error: (err) => {
        this.showPop("Can't verify account");
        console.log("Err:", err);
      },
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
          next: (res) => {
            console.log(res);
            location.reload();
          },
          error: (err) => console.log(err),
        });
      this.getCompanyInfo();
    } else {
      console.log("Form is invalid");
    }
  }
}
