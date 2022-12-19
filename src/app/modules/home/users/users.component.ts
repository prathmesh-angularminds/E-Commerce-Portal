import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {

  updateSellerForm: FormGroup;
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
  limit: number = 5;

  constructor(private httpService: HttpServiceService) {}

  ngOnInit(): void {
    this.sellerForm = new FormGroup({
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
      role: new FormControl("", [Validators.required]),
    });

    this.setSellerForm({name: "",password: "",email: ""});

    this.setSellerList(`limit=5`);
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
    this.httpService.getSellers(params).subscribe((data: any) => {
      this.completeResp = data;
      this.sellerList = data.results;
      console.log(data);
    });
  }

  // This function helps in showing and hidding password
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

  // Set Page limit
  setDataLimit(limit: number) {
    
    this.limit = limit;
    console.log(limit)
    this.setSellerList(`limit=${limit}`);
  }

  // Delete Seller
  deleteSeller(id: string) {
    this.httpService.deleteSeller(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {},
    });
    this.setSellerList(`limit=5`);
  }

  applyPagination(page: number) {

    console.log(page);
    
    let params = `page=${page}&limit=${this.limit}`;
    this.setSellerList(params);
  }

  setSellerRole(id: string,role: string) {

    this.httpService.updateSeller(id,'/users/role',{role}).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {},
    });
    this.setSellerList(`limit=${this.limit}`);
  }

  addSeller() {
    if (this.sellerForm.valid) {
      this.httpService
        .setSellerToDB(this.sellerForm.value, "/users")
        .subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (err: any) => {
            console.log(err)
          },
        });
      this.setSellerList(`limit=${this.limit}`);
      this.showPop("Seller added successfully");
      this.sellerForm.reset();
    } else {
      console.log("Invalid");
      // this.showPop("Invalid Form Filled");
    }
  }

  setSellerForm(seller: any) {

    this.id = seller._id;

    this.updateSellerForm = new FormGroup({
      name: new FormControl(seller.name, [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*$"),
      ]),

      email: new FormControl(seller.email, [
        Validators.required,
        Validators.pattern("[a-z0-9]+@[a-z]+.[a-z]{2,3}"), // Validator for email
      ]),
      password: new FormControl(seller.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ]),
    });
  }

  updateSeller() {

    const seller = this.updateSellerForm.value;

    if (this.updateSellerForm.valid) {
      this.httpService
        .updateSeller(this.id,'/users/',seller)
        .subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (err: any) => {
            console.log(err)
          },
        });
      this.setSellerList(`limit=${this.limit}`);
      this.showPop("Seller added successfully");
      this.updateSellerForm.reset();
    } else {
      console.log("Invalid");
      // this.showPop("Invalid Form Filled");
    }
  }
}
