import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";
import { UsersdataService } from "src/app/services/usersdata.service";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.scss"],
})
export class ProfileUpdateComponent implements OnInit {
  updateInfoForm: FormGroup;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  info: any;

  constructor(
    private httpService: HttpServiceService,
    private userData: UsersdataService
  ) {}

  ngOnInit(): void {
    this.info = this.userData.getUser("customerLogged");
    console.log(this.info);
    this.setUpdateInfoForm();
  }

  setUpdateInfoForm() {
    this.updateInfoForm = new FormGroup({
      name: new FormControl(this.info.name, [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*$"),
      ]),

      email: new FormControl(this.info.email, [
        Validators.required,
        Validators.pattern("[a-z0-9]+@[a-z]+.[a-z]{2,3}"), // Validator for email
      ]),
    });
  }

  // Getter Methods

  get getName() {
    return this.updateInfoForm.get("name");
  }

  get getEmail() {
    return this.updateInfoForm.get("email");
  }

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  submitUpdatedInfo() {
    const customerInfo = this.updateInfoForm.value;
    this.info.name = customerInfo.name;
    this.info.email = customerInfo.email;
    const url = "/customers/update-profile";

    this.httpService.patch(url, "", customerInfo).subscribe({
      next: (res) => {
        this.userData.setUser(res, "customerLogged");
        this.showPop("Profile Update Successfully");
        this.userData.updateDetails.next(true);
        setTimeout(()=> {
          this.userData.updateDetails.next(false);
        },200)
      },
      error: (err) => console.log(err.error.message),
    });
  }
}
