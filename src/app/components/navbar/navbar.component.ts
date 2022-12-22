import { Component, OnInit } from "@angular/core";
import { UsersdataService } from "src/app/services/usersdata.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  updateForm: FormGroup;
  formType: string = "";
  user: any;
  checked: boolean = false;
  demo: Router;

  constructor(
    private userData: UsersdataService,
    private httpService: HttpServiceService,
    private router: Router,
  ) {
   this.demo = this.router
  }

  ngOnInit(): void {
    this.setForm({ _org: { name: "", email: "" } }, "");
    this.getCompanyInfo();
  }

  // Getter Methods

  get getName() {
    return this.updateForm.get("name");
  }

  get getEmail() {
    return this.updateForm.get("email");
  }

  get getOld() {
    return this.updateForm.get("old_password");
  }

  get getNew() {
    return this.updateForm.get("new_password");
  }

  // Function to get Company Info
  getCompanyInfo() {
    const url: string = "/auth/self";
    console.log('get info');
    this.httpService.get(url).subscribe({
      next: (res) => {
        this.userData.setUser(res);
        this.user = this.userData.getUser();
        console.log(this.user);
      },
      error: (err) => console.log(err),
    });
  }

  setForm(company: any = { _org: { name: "", email: "" } }, type: string) {
    this.formType = type;

    this.updateForm = new FormGroup({
      name: new FormControl(company?._org.name, [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*$"),
      ]),
      email: new FormControl(company?._org.email, [
        Validators.required,
        Validators.pattern("[a-z0-9]+@[a-z]+.[a-z]{2,3}"), // Validator for email
      ]),
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
    });
  }

  // This function helps in showing and hidding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }

  // Logout a user
  logoutUser(): void {
    this.userData.clearStorage();
    this.router.navigate(['/auth/login'])
  }

  changePassword() {
    let seller = this.updateForm.value;
    delete seller["name"];
    delete seller["email"];

    if (seller.old_password !== "" && seller.new_password !== "") {
      this.httpService
        .post("/users/auth/change-password", "", seller)
        .subscribe({
          next: (res) => {
            console.log("res: ", res);
            this.getCompanyInfo();
          },
          error: (err) => console.log("err", err),
        });
    } else {
      console.log("Invalid");
    }
  }

  updateInfo() {
    let seller = this.updateForm.value;
    delete seller["new_password"];
    delete seller["old_password"];

    if (seller.name !== "" && seller.email !== "") {
      this.httpService.patch("/users/org", "", seller).subscribe({
        next: (res) => {
          console.log('sucess');
          console.log("res: ", res);
          this.ngOnInit();
          this.router.navigate(['/app']);
          console.log("Hello")
        },
        error: (err) => console.log("err", err),
      });
    } else {
      console.log("Invalid");
    }
  }
}
