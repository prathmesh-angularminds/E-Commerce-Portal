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
    this.setUpdateInfoForm();
    this.getCustomer();
  }

  // Get User
  getCustomer() {

    const url = "/shop/auth/self"
    this.httpService.get(url,"").subscribe({
      next: (res: any) => {this.info = res; console.log(res);this.setUpdateInfoForm()},
      error: (err: any) => console.log(err)
    })
  }

  setUpdateInfoForm() {

    this.updateInfoForm = new FormGroup({
      name: new FormControl(this.info === undefined ? "" : this.info.name, [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*$"),
      ]),

      email: new FormControl(this.info === undefined ? "" : this.info.email, [
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
        this.getCustomer();
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
