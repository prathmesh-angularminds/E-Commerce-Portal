import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersdataService } from 'src/app/services/usersdata.service';
import { Router } from '@angular/router';
// import comparePasswords from 'src/app/custom-validtors/compare-passwords';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  // Instance of FormGroup for form
  registerForm: FormGroup;
  checked: boolean = false;
  errorMsg: string = "";
  errorMsgClass: {snackbar: boolean, show: boolean} = {
    snackbar: true,
    show: false
  };

  constructor(private usersData: UsersdataService, private router: Router) {
    
    
    console.log('re')
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*$'),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'), // Validator for email
      ]),
      companyName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      confPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });
  }

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

  // show popup code
  showPop(message: string) {

    this.errorMsgClass.show = true;
    this.errorMsg = message
    setTimeout(() =>{  
      this.errorMsgClass.show = false;
    }, 3000)
  }

  findUser =  (user: any): boolean =>  { return user.email === this.getEmail?.value }

  // Function which is called when a user clicks on register btn
  registerAUser() {
    

    let user = this.usersData.getUser();                  // form initializing empty object of user
    let usersList = this.usersData.getUsersList();

    if (this.registerForm.invalid) {

      // If form is not present
      this.showPop("Form submitted is invalid")
  
    } else if(usersList.find(this.findUser)) {

      // If User is already present
      this.router.navigate(['/auth/register'])
      this.showPop("User is already present")
    } else {
      
      // Is User is valid 
      let registerValue = this.registerForm.value;
      
      registerValue['token'] = Math.random().toString(36).substr(2)
      delete registerValue.confPassword;
      this.usersData.setUsersList(registerValue);
      this.router.navigate(['/auth/login'])
    }
  }

  // This function helps in showing and hidding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }
}
