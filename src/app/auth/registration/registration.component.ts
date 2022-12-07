import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersdataService } from 'src/app/services/usersdata.service';
import comparePasswords from 'src/app/custom-validtors/compare-passwords';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  // Instance of FormGroup for form
  registerForm: FormGroup;
  checked: boolean = false;

  constructor(private usersData: UsersdataService) {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*$'),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'), // Validator for email
      ]),
      companyName: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        // ),
      ]),
      confPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        // ),
      ]),
    });
  }

  ngOnInit(): void {}

  // Getter Methods
  get getName() {
    return this.registerForm.get('fullName');
  }

  get getEmail() {
    return this.registerForm.get('email');
  }

  get getCompName() {
    return this.registerForm.get('companyName');
  }

  get getPass() {
    return this.registerForm.get('password');
  }

  get getConfPass() {
    return this.registerForm.get('confPassword');
  }

  // Function which is called when a user clicks on register btn
  registerAUser() {
    if (this.registerForm.valid) {
      
      let usersList = this.usersData.getUsersList();
      
      if (
        usersList.length === 0 ||
        usersList.find((userData: any): boolean => {
          return userData.email === this.getEmail?.value ? false : true;
        })
      ) {
        let registerValue = this.registerForm.value;
        delete registerValue.confPassword;

        this.usersData.setUsersList(registerValue);
      } else {
        console.log('User is already present');
      }
    } else {
      console.log(this.registerForm.valid);
    }
  }

  // This function helps in showing and hidding password
  showPasswordToggle(event: Event) {
    this.checked = !this.checked;
  }
}
