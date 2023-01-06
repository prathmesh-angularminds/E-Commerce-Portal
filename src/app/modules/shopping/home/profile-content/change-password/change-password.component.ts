import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  passForm: FormGroup;
  checked: boolean = false;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {

    this.setPasswordForm();
  }

  setPasswordForm() {

    this.passForm = new FormGroup({
      old_password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
      new_password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
      confirm_password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
    })
  }


  // Getter Methods

  get getOld() {

    return this.passForm.get('old_password')
  }

  get getNew() {

    return this.passForm.get('new_password')
  }

  get getConf() {

    return this.passForm.get('confirm_password')
  }

  // This function helps in showing and hiding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  submitPassword() {

    let password = this.passForm.value;
    delete password.confirm_password;

    console.log(password)
    const url = "/customers/auth/change-password";
    this.httpService.post(url,"",password).subscribe({
      next: (res) => this.showPop("Password Changed Successfully"),
      error: (err) => this.showPop(err.error.message),
    })
  }
}
