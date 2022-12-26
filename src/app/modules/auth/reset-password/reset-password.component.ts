import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";


@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  checked: boolean = false;
  token: string;
  errorMsg: string = "";
  errorMsgClass: {snackbar: boolean, show: boolean} = {
    snackbar: true,
    show: false
  };

  constructor(private routes: ActivatedRoute, private httpService: HttpServiceService, private router: Router) {}

  ngOnInit(): void {
    this.setResetForm();
    this.getParams();
  }

  // getter method
  get getPass() {
    return this.resetForm.get("password");
  }

  get getConfPass() {
    return this.resetForm.get("conf_password");
  }

  // get params
  getParams() {

    this.routes.queryParams.subscribe({
      next: (res) => {
        console.log("Query Params Res: ",res);
        this.token = res["token"];
      }
    });
  }

  // set form
  setResetForm() {
    this.resetForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
      conf_password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
      token : new FormControl(),
    });
  }

  // This function helps in showing and hidding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }

  // show popup code
  showPop(message: string,status: boolean) {

    this.errorMsgClass.show = true;
    this.errorMsg = message
    setTimeout(() =>{  
      this.errorMsgClass.show = false;
      if(status)
        this.router.navigate(['/auth/login'])
    }, 3000)
  }

  // Submit Reset Form
  submitResetForm() {

    const url = "/auth/reset-password?"
    const params = `token=${this.token}`;
    
    // this.resetForm.value;
    delete this.resetForm.value.conf_password;
    delete this.resetForm.value.token;
    this.httpService.post(url,params,this.resetForm.value).subscribe({
      next: (res) => this.showPop("Password Reset Successfully",true),
      error: (err) => this.showPop("Password Reset Operation Failed",false)
    })
  }
}
