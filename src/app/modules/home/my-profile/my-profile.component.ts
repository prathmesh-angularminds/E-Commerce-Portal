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
  ) {}

  ngOnInit(): void {
    this.getCompanyInfo();
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
      error: (err) => console.log(err),
    });
  }

  // Email Verification
  verifyCompanyEmail(): void {
    const url: string = `/auth/${this.loggedInUser.email}`;
    const email: string = this.loggedInUser.email;
    console.log(email);

    this.httpService
      .post(
        "/auth/verify-email",
        ``,
        {'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2ExZWNlY2I5ZDlmMGVkMjYxOGNmNzAiLCJpYXQiOjE2NzE4ODgxMTcsImV4cCI6MTY3MTg5MTcxNywidHlwZSI6InZlcmlmeUVtYWlsIn0.q0iT2FCwNZsTmyIS7xKIxucFNwTmlcz2dvwHfeLN1SY'}
      )
      .subscribe({
        next: (res) => console.log("res: ", res),
        error: (err) => console.log("err: ", err),
      });

    // this.httpService.post(url).subscribe({
    //   next: (res) => console.log("res: ",res),
    //   error: (err) => console.log("err: ",err),
    // });
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
