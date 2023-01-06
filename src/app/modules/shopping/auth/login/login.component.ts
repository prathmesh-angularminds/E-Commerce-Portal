import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersdataService } from "src/app/services/usersdata.service";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  checked: boolean = false;
  errorMsg: string = "Show Something";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  passForm: FormGroup;
  captchaToken: string;

  constructor(
    private usersdata: UsersdataService,
    private router: Router,
    private httpService: HttpServiceService,
  ) {}

  ngOnInit(): void {
    this.setLoginForm();
  }

  get getEmail() {
    return this.loginForm.get("email");
  }

  get getPass() {
    return this.loginForm.get("password");
  }

  get getCaptcha() {
    return this.loginForm.get("captcha");
  }

  get forgetPassEmail() {
    return this.passForm.get("email");
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

    // Forget Pass Form
    this.passForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9]+@[a-z]+.[a-z]{2,3}"), // Validator for email
      ]),
    });
  }

  forgetPassword() {
    console.log(this.passForm.value.email);
    const url: string = "/auth/forgot-password";
    const payload = {
      email: this.passForm.value.email,
    };

    this.httpService.post(url, "", payload).subscribe({
      next: (res) => this.showPop("Mail is send on Ethereal"),
      error: (err) => this.showPop(err.error.message),
    });
  }

  // function which check whether user is present or not
  findUser = (user: any): boolean => {
    return (
      user.email === this.getEmail?.value &&
      user.password === this.getPass?.value
    );
  };

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  logAUser(): void {
    if (this.loginForm.valid) {
      let url = "/shop/auth/login";
      this.httpService.post(url, "", this.loginForm.value).subscribe({
        next: (data: any) => {
          console.log("Data:",data);
          this.usersdata.setToken(data.token,"customerToken");
          this.usersdata.setUser(data.customer,"customerLogged");
          this.router.navigate(["/app/my-profile"]);
        },
        error: (err) => {
          console.log(err)
          this.showPop(err.error.message);
        },
      });

      localStorage.clear();
    } else {
      this.showPop("Invalid Users please register");
    }
  }

  // This function helps in showing and hiding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }
}
