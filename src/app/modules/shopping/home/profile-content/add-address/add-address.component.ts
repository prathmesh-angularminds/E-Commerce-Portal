import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  addressForm: FormGroup;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };

  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit(): void {


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

  // Getter Methods

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

  // show popup code
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
      this.router.navigate(['/app/my-profile'])
    }, 3000);
  }

  // Gets city and state values from dropdown
  getSelected(event: any,type: String) {

    if(type === 'city') {
      this.addressForm.value['city'] = event.target.value;      
    } else {
      this.addressForm.value['state'] = event.target.value;
    }
  }
}
