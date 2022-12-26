import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  loggedUser: any;
  id: string;
  sellerForm: FormGroup;
  checked: boolean = false;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  sellerList: any;
  completeResp: any;
  limit: number = 3;
  searchedValue: string = "";

  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {
    this.setNewForm();
    this.loggedUser = JSON.parse(localStorage.getItem("loggedUser")!);
    this.setSellerList(`limit=${this.limit}`);
  }

  // Getter Methods
  get getName() {
    return this.sellerForm.get("name");
  }

  get getEmail() {
    return this.sellerForm.get("email");
  }

  get getPass() {
    return this.sellerForm.get("password");
  }

  get getRole() {
    return this.sellerForm.get("role");
  }

  setSellerList(params: string) {
    const url: string = "/users?";
    this.httpService.get(url, params).subscribe({
      next: (res: any) => {
        this.completeResp = res;
        this.sellerList = res.results;
      },
      error: (err: any) => {
        this.sellerList = undefined;
        this.showPop("Can't show the list");
        console.log("Err:", err);
      },
    });
  }

  // This function helps in showing and hiding password [Completed]
  showPasswordToggle() {
    this.checked = !this.checked;
  }

  // show popup code [Completed]
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  // handles search bar input
  sellerSearch(): void {
    if (this.searchedValue === "") {
      const params = `limit=${this.limit}`;
      this.setSellerList(params);
    } else {
      const params = `name=${this.searchedValue}&limit=${this.limit}`;
      this.setSellerList(params);
    }
    this.checked = false;
  }

  // Set Page limit [Completed]
  setDataLimit(limit: number, page: number) {
    if (this.completeResp.results.length < limit) {
      page = page - 1;
    }
    this.limit = limit;
    this.setSellerList(`limit=${limit}&page=${page}`);
  }

  // Delete Seller [Completed]
  deleteSeller(id: string) {
    const params: string = `/users/${id}`;

    this.httpService.delete(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.showPop("Seller Deleted Successfully");
        this.setSellerList(`limit=${this.limit}&page=${this.completeResp.page}`);
      },
      error: (err: any) => {
        this.showPop("Can't delete user");
        console.log("Err: ", err);
      },
    });
  }

  // function to apply pagination
  applyPagination(page: number) {

    
    let params = `limit=${this.limit}&page=${page}`;
    this.setSellerList(params);
  }

  // function to set sellers role
  setSellerRole(id: string, role: string) {
    const url: string = "/users/role/";
    this.httpService.patch(url, id, { role }).subscribe({
      next: (res: any) => {
        this.setSellerList(
          `limit=${this.limit}&page=${this.completeResp.page}`
        );
      },
      error: (err: any) => {
        this.showPop("Can't Set Sellers Role");
        console.log("Err:", err);
      },
    });
  }

  // New Seller Data Form [Completed]
  setNewForm(
    seller: any = { name: "", password: "", email: "" },
    id: string = ""
  ) {
    // this.toggleForm = id === "" ? "new" : "update";
    this.id = id === "" ? "" : id;

    this.sellerForm = new FormGroup({
      name: new FormControl(seller.name, [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*$"),
      ]),

      email: new FormControl(seller.email, [
        Validators.required,
        Validators.pattern("[a-z0-9]+@[a-z]+.[a-z]{2,3}"), // Validator for email
      ]),
      password: new FormControl(seller.pasword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
      role: new FormControl("", [Validators.required]),
    });
  }

  // Add New Seller In List [Completed]
  addSeller() {
    const url = "/users";

    if (this.sellerForm.valid) {
      this.httpService.post(url, "", this.sellerForm.value).subscribe({
        next: (res: any) => {
          this.setSellerList(
            `limit=${this.limit}&page=${this.completeResp.page}`
          );
          this.showPop("Seller added successfully");
        },
        error: (err: any) => {
          this.showPop(err.error.message);
          console.log("Err:", err);
        },
      });
    } else {
      this.showPop("Invalid Form Filled");
    }
    this.sellerForm.reset();
  }

  updateSeller() {
    const seller = this.sellerForm.value;
    const url: string = `/users/`;
    delete seller["role"];

    if (this.getEmail?.valid && this.getName?.valid && this.getPass?.valid) {
      this.httpService.patch(url, this.id, seller).subscribe({
        next: (res: any) => {
          this.setSellerList(
            `limit=${this.limit}&page=${this.completeResp.page}`
          );
          this.showPop("Seller updated successfully");
        },
        error: (err: any) => {
          this.showPop("Invalid Seller");
          console.log("Err:", err);
        },
      });
    } else {
      this.showPop("Invalid Form Filled");
    }

    this.sellerForm.reset();
  }
}
