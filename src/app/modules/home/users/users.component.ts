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
  updateSellerForm: FormGroup;
  checked: boolean = false;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  sellerList: any;
  completeResp: any;
  limit: number = 5;
  searchedValue: string = ""
  toggleForm: string = "";

  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {
    this.setNewForm();
    this.loggedUser = localStorage.getItem("loggedUser");
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

  get getName1() {
    return this.updateSellerForm.get("name");
  }

  get getEmail1() {
    return this.updateSellerForm.get("email");
  }

  get getPass1() {
    return this.updateSellerForm.get("password");
  }

  setSellerList(params: string) {

    const url: string = "/users?";
    this.httpService.get(url,params).subscribe({
      next: (res: any) => {
        this.completeResp = res;
        this.sellerList = res.results;
        console.log("res: ", res);
      },
      error: (err: any) => {
        console.log("res: ", err);
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
    
    if(this.searchedValue === "") {
      const params = `limit=${this.limit}`
      // console.log(event.target)
      this.setSellerList(params);
    } else {
      const params = `name=${this.searchedValue}&limit=${this.limit}`
      // console.log(event.target)
      this.setSellerList(params);
    }
    console.log(this.searchedValue)
    this.checked = false;

  }

  // Set Page limit [Completed]
  setDataLimit(limit: number) {
    this.limit = limit;
    console.log(limit);
    this.setSellerList(`limit=${limit}`);
  }

  // Delete Seller [Completed]
  deleteSeller(id: string) {

    const params: string = `/users/${id}`;
    this.httpService.delete(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.setSellerList(`limit=5`);
      },
      error: (err: any) => {},
    });
  }

  applyPagination(page: number) {
    console.log(page);
    let params = `page=${page}&limit=${this.limit}`;
    this.setSellerList(params);
  }

  // [Completed]
  setSellerRole(id: string, role: string) {
    const url: string = '/users/role/';
    this.httpService.patch(url,id, { role }).subscribe({
      next: (res: any) => {
        console.log("res:", res);
        this.setSellerList(`limit=${this.limit}`);
      },
      error: (err: any) => {
        console.log("err:", err);
      },
    });
    
  }

  // New Seller Data Form [Completed]
  setNewForm(seller: any = {name: "", password: "",email: ""}, id: string = "") {

    this.toggleForm = id === "" ? "new" : "update";
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
    if (this.sellerForm.valid) {
      this.httpService
        .setSellerToDB(this.sellerForm.value, "/users")
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.setSellerList(`limit=${this.limit}`);
            this.showPop("Seller added successfully");
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      this.sellerForm.reset();
    } else {
      console.log("Invalid");
      // this.showPop("Invalid Form Filled");
    }
  }

  updateSeller() {
    const seller = this.sellerForm.value;
    const url: string = `/users/`;
    console.log(this.id)
    delete seller['role']

    if (seller?.role === undefined || this.sellerForm.valid) {
      this.httpService.patch(url,this.id, seller).subscribe({
        next: (res: any) => {
          console.log("res: ", res);
          this.setSellerList(`limit=${this.limit}`);
          this.showPop("Seller added successfully");
        },
        error: (err: any) => {
          console.log("err: ", err);
        },
      });
      this.sellerForm.reset();
    } else {
      console.log("Invalid");
      // this.showPop("Invalid Form Filled");
    }
  }
}
