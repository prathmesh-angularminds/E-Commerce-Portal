import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";
import { UsersdataService } from "src/app/services/usersdata.service";

@Component({
  selector: "app-check-out-login",
  templateUrl: "./check-out-login.component.html",
  styleUrls: ["./check-out-login.component.scss"],
})
export class CheckOutLoginComponent implements OnInit {

  userData: any;
  checked: boolean = false;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  loginForm: FormGroup;
  toggleBtn1: boolean = true;                       // For Change User


  constructor(
    private httpService: HttpServiceService,
    private usersData: UsersdataService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.setLoginForm();
  }

  // Getter Methods
  get getEmail() {
    return this.loginForm.get("email");
  }

  get getPass() {
    return this.loginForm.get("password");
  }

  get getCaptcha() {
    return this.loginForm.get("captcha");
  }

  setLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9]+@[a-z]+.[a-z]{2,3}"), // Validator for email
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
    });
  }

  getUserData() {
    const url = "/shop/auth/self";
    this.httpService.get(url).subscribe({
      next: (res) => {
        this.userData = res;
      },
      error: (err) => this.showPop(err.error.message),
    });
  }

  // show popup code [Completed]
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  logAUser(): void {
    let url = "/shop/auth/login";
    this.httpService.post(url, "", this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log("res:", res);
        localStorage.setItem("customerToken", res.token);
        this.getUserData();
        this.usersData.updateDetails?.next(true);
        setTimeout(() => {
          this.userData.updateDetails?.next(false);
        },200)
      },
      error: (err) => {
        this.showPop(err.error.message);
      },
    });
    this.loginForm.reset();
  }

}
// VIGZ3YGR 