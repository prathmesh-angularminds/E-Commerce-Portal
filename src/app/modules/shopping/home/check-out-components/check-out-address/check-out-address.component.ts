import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressServiceService } from "src/app/services/address-service.service";
import { HttpServiceService } from "src/app/services/http-service.service";
import { UsersdataService } from "src/app/services/usersdata.service";

@Component({
  selector: "app-check-out-address",
  templateUrl: "./check-out-address.component.html",
  styleUrls: ["./check-out-address.component.scss"],
})
export class CheckOutAddressComponent implements OnInit {
  usersData: any;
  addressList: any;
  deliveryAddress: any;
  orderId: string;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  items: any;
  total: any;
  addressForm: FormGroup;
  citiesList: any;
  stateList: any;

  constructor(
    private httpService: HttpServiceService,
    private router: Router,
    private userData: UsersdataService,
    private http: AddressServiceService
  ) {}

  ngOnInit(): void {
    this.getAddress();
    this.userData.updateDetails.subscribe({
      next: (res) => {
        if (res) {
          this.getAddress();
          this.getUserData();
        }
      },
    });
    this.getItems();
    this.getUserData();
    this.setAddressForm();

    this.getstateList();
    this.getCityList('JK');
    this.setAddressForm();
  }


  setAddressForm() {

    this.addressForm = new FormGroup({
      street: new FormControl("",[Validators.required]),
      addressLine2: new FormControl("",[Validators.required]),
      city: new FormControl("",[Validators.required]),
      state: new FormControl("",[Validators.required]),
      pin: new FormControl("",[Validators.required]),
    });
  }

  get getStreet() {

    return this.addressForm.get('street');
  }

  get getLine() {

    return this.addressForm.get('addressLine2');
  }

  get getCity() {

    return this.addressForm.get('city');
  }

  get getState() {

    return this.addressForm.get('state');
  }

  get getPin() {

    return this.addressForm.get('pin');
  }

  getItems() {
    this.items = JSON.parse(localStorage.getItem("cart") || "[]");
    this.total = parseInt(
      JSON.parse(localStorage.getItem("totalAmount") || "0")
    );
    this.items = this.items.map((item: any) => {
      delete item["_org"];
      delete item["_id"];
      delete item["createdAt"];
      delete item["images"];
      delete item["description"];

      return item;
    });
  }

  getAddress() {
    const url = "/customers/address";
    this.httpService.get(url).subscribe({
      next: (res) => {
        this.addressList = res;
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  setAddress(address: any) {
    this.deliveryAddress = address;
  }

  getUserData() {
    const url = "/shop/auth/self";
    this.httpService.get(url).subscribe({
      next: (res) => {
        this.usersData = res;
      },
      error: (err) => this.showPop(err.error.message),
    });
  }

  submitAddress() {
    const url = "/shop/orders";

    let payload = {
      items: this.items,
      total: this.total,
      address: this.deliveryAddress,
      deliveryFee: 0,
    };

    this.httpService.post(url, "", payload).subscribe({
      next: (res) => {
        localStorage.setItem("orderId", res.order._id);
        this.showPop("Your Order is Placed");
      },
      error: (err) => this.showPop(err.error.message),
    });
  }

  // show popup code [Completed]
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

   // Add New Address
   addNewAddress() {

    const url = "/customers/address"
    const address = this.addressForm.value;
    this.httpService.post(url,"",address).subscribe({
      next: (res) => {
        console.log(res);
        this.showPop("Address is address successfully");
        this.addressForm.reset();
      },
      error: (err) => {
        this.showPop(err.error.message);
      }
    });
  }


  // Gets city and state values from dropdown
  getSelected(event: any,type: String) {

    if(type === 'city') {
      this.addressForm.value['city'] = event.target.value;      
    } else {
      this.addressForm.value['state'] = event.target.value;
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
