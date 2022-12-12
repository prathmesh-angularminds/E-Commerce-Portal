import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersdataService } from "src/app/services/usersdata.service";
import { Router } from "@angular/router";

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

  constructor(private usersdata: UsersdataService, private router: Router) {
   

    // console.log("In Login");
  }

  ngOnInit(): void {
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
  get getEmail() {
    return this.loginForm.get("email");
  }

  get getPass() {
    return this.loginForm.get("password");
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
    let usersList = this.usersdata.getUsersList();
    let loggedUser = usersList.find(this.findUser);
    if (loggedUser) {
      this.usersdata.setUser(loggedUser);
      this.router.navigate(["/my-profile"]);
    } else if (this.getEmail?.value === "" || this.getPass?.value === "") {
      this.showPop("Email and password are not provided");
    } else {
      this.showPop("User not found");
      // this.router.navigate(["/auth/login"]);
    }
  }

  // This function helps in showing and hidding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }
}