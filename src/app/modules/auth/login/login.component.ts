import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersdataService } from "src/app/services/usersdata.service";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";
import { ReCaptchaV3Service } from "ng-recaptcha";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";

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

  constructor(
    private usersdata: UsersdataService,
    private router: Router,
    private httpService: HttpServiceService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private authService: SocialAuthService
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

    return this.passForm.get('email');
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
      captcha: new FormControl("", [Validators.required]),
    });

    // Forget Pass Form
    this.passForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9]+@[a-z]+.[a-z]{2,3}"), // Validator for email
      ]),
    })
  }

  // googleSignIn() {
  //   this.authService
  //     .signIn(GoogleLoginProvider.PROVIDER_ID)
  //     // .then((data) =>
  //     //   localStorage.setItem("loggedInUser", JSON.stringify(data))
  //     // );
  // }

  forgetPassword() {

    console.log(this.passForm.value.email)
    const url:string = '/auth/forgot-password';
    const payload = {
      email: this.passForm.value.email,
    }

    this.httpService.post(url,"",payload).subscribe({
      next: res => {console.log("res: ",res)},
      error: err => {console.log("err: ",err)}
    });
  }

  // captcha function
  public onCaptchaChecked(): void {
    this.recaptchaV3Service
      .execute("importantAction")
      .subscribe((token: any) => {this.loginForm.value.captcha = token; localStorage.clear()});
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
      console.log(this.loginForm.value);
      let url = "/auth/login";
      this.httpService.setToDB(this.loginForm.value, url).subscribe(
        (data: any) => {
          this.usersdata.setToken(data.token);
          this.router.navigate(["/app/my-profile"]);
        },
        (err) => {
          this.showPop(err.error.message);
        }
      );
    } else {
      this.showPop("Invalid Users please register");
    }
  }

  // This function helps in showing and hidding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }
}
