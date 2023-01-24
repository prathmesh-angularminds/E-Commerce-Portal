import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersdataService } from "src/app/services/usersdata.service";
import { Router, NavigationEnd } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";
import { ToasterServiceService } from "src/app/components/toaster/toaster-service.service";
import { filter, pairwise } from "rxjs";

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
  url: string = "";

  constructor(
    private usersdata: UsersdataService,
    private router: Router,
    private httpService: HttpServiceService,
    private toaster: ToasterServiceService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((event: any) => {
        console.log("Url:",event[0].urlAfterRedirects);
        localStorage.setItem("prevUrl", event[0].urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    this.setLoginForm();
  }

  route() {}

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

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
    // this.toaster.showPopUp("success",message);
  }

  logAUser(): void {
    let prevUrl = localStorage.getItem("prevUrl");
    localStorage.removeItem('prevUrl');
    console.log(this.url);
    if (this.loginForm.valid) {
      let url = "/shop/auth/login";
      this.httpService.post(url, "", this.loginForm.value).subscribe({
        next: (res: any) => {
          this.toaster.showPopUp("success", res);
          this.usersdata.setToken(res.token, "customerToken");
          prevUrl === null || prevUrl === undefined
            ? this.router.navigate(["/app/product"])
            : this.router.navigate([prevUrl]);
        },
        error: (err) => {
          this.showPop(err.error.message);
        },
      });
      this.loginForm.reset();
    } else {
      this.showPop("Invalid Users please register");
    }
  }

  // This function helps in showing and hiding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }
}
