import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";
import { Router } from "@angular/router";
import { AddressServiceService } from "src/app/services/address-service.service";

@Component({
  selector: "app-update-address",
  templateUrl: "./update-address.component.html",
  styleUrls: ["./update-address.component.scss"],
})

export class UpdateAddressComponent implements OnInit {
  updateAddressForm: FormGroup;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  citiesList: any;
  stateList: any;

  constructor(private httpService: HttpServiceService, private router: Router,private http: AddressServiceService) {
  }

  ngOnInit(): void {

    this.getstateList();
    this.getCityList('JK');
    this.setUpdateAddressForm();
  }

  setUpdateAddressForm() {

    const address = history.state;
    this.updateAddressForm = new FormGroup({
      street: new FormControl(address.street, [Validators.required]),
      addressLine2: new FormControl(address.addressLine2, [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      pin: new FormControl(address.pin, [Validators.required]),
    });
  }

  // Getter Methods

  get getStreet() {

    return this.updateAddressForm.get('street');
  }

  get getLine() {

    return this.updateAddressForm.get('addressLine2');
  }

  get getCity() {

    return this.updateAddressForm.get('city');
  }

  get getState() {

    return this.updateAddressForm.get('state');
  }

  get getPin() {

    return this.updateAddressForm.get('pin');
  }

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
      this.router.navigate(["/app/my-profile"]);
    }, 3000);
  }

  // Gets city and state values from dropdown
  getSelected(event: any,type: String) {

    if(type === 'city') {
      this.updateAddressForm.value['city'] = event.target.value;      
    } else {
      this.updateAddressForm.value['state'] = event.target.value;
    }
  }

  updateAddress() {

    const address = history.state;
    const url = `/customers/address/${address._id}`
    const newAddress = this.updateAddressForm.value;

    this.httpService.put(url,"",newAddress).subscribe({
      next: res => this.showPop("Address is update Successfully"),
      error: err => this.showPop(err.error.message)
    })
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
