import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";
import { AddressServiceService } from "src/app/services/address-service.service";
// import { ReCaptchaV3Service } from "ng-recaptcha";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {

  // Instance of FormGroup for form
  registerForm: FormGroup;
  checked: boolean = false;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  citiesList: any;
  stateList: any;

  constructor(
    private router: Router,
    private httpService: HttpServiceService, 
    private http: AddressServiceService
  ) {}

  ngOnInit(): void {

    this.getstateList();
    this.getCityList('JK');
    this.setRegisterForm();
  }

  // Getter Methods
  get getName() {
    return this.registerForm.get("name");
  }

  get getEmail() {
    return this.registerForm.get("email");
  }

  get getCompName() {
    return this.registerForm.get("company");
  }

  get getPass() {
    return this.registerForm.get("password");
  }

  get getConfPass() {
    return this.registerForm.get("confPassword");
  }

  get getStreet() {
    return this.registerForm.get("street");
  }

  get getLine() {
    return this.registerForm.get("addressLine2");
  }

  get getCity() {
    return this.registerForm.get("city");
  }

  get getState() {
    return this.registerForm.get("state");
  }

  get getPin() {
    return this.registerForm.get("pin");
  }

  // Set Reset Form
  setRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*$"),
      ]),

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
      confPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
      street: new FormControl("", [Validators.required]),
      addressLine2: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      pin: new FormControl("", [Validators.required]),
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

  // Function which is called when a user clicks on register btn
  registerAUser() {

    if (this.registerForm.invalid) {
      this.showPop("Form submitted is invalid");
    } else {
      let url = "/shop/auth/register";
      let registerValue = this.registerForm.value;
      // this.registerForm.value.captcha = this.captchaToken;

      // removing captcha and password btn
      delete registerValue.confPassword;
      registerValue["address"] = {
        street: "ABC road",
        addressLine2: "Dagdusheth Temple",
        city: "Pune",
        state: "Maharashtra",
        pin: "411090",
      };

      this.httpService.post(url, "", registerValue).subscribe({
        next: (res) => {
          console.log(res);
          this.showPop("User Registered Successfully");
          setTimeout(() => this.router.navigate(["/auth/login"]), 3000);
        },
        error: (err) => {
          this.showPop(err.error.message);
        },
      });
    }
  }

  // This function helps in showing and hiding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }

  // Gets city and state values from dropdown
  getSelected(event: any,type: String) {

    if(type === 'city') {
      this.registerForm.value['city'] = event.target.value;

    } else {
      this.registerForm.value['state'] = event.target.value;
    }
  }

  // Getting State List
  getstateList() {

    this.http.get("/states").subscribe({
      next: (res) => this.stateList = res,
      error: (err) => console.log(err),
    });

  }
  // Getting Cities List
  getCityList(state: string) {
    this.http.get(`/states/${state}/cities`).subscribe({
      next: (res) => this.citiesList = res,
      error: err => console.log(err)
    });
  }
}
