import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "src/app/services/http-service.service";
import { Router, TitleStrategy } from "@angular/router";

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

  constructor(private httpService: HttpServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.setUpdateAddressForm();
  }

  setUpdateAddressForm() {

    const address = history.state;
    this.updateAddressForm = new FormGroup({
      street: new FormControl(address.street, [Validators.required]),
      addressLine2: new FormControl(address.addressLine2, [Validators.required]),
      city: new FormControl(address.city, [Validators.required]),
      state: new FormControl(address.state, [Validators.required]),
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
}
