import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersdataService } from 'src/app/services/usersdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  checked: boolean = false;

  constructor(private usersdata: UsersdataService, private router: Router) { 

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'), // Validator for email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });

    console.log("In Login")

  }

  ngOnInit(): void {
  }

  get getEmail() {

    return this.loginForm.get('email');
  }

  get getPass() {

    return this.loginForm.get('password');
  }

  // function which check whether user is present or not
  findUser =  (user: any): boolean =>  { return ((user.email === this.getEmail?.value) && (user.password === this.getPass?.value)) }

  logAUser():void {

    
    let usersList = this.usersdata.getUsersList();
    let loggedUser = usersList.find(this.findUser);

    if(loggedUser) {
      this.usersdata.setUser(loggedUser);
    } else {
      
      this.router.navigate(['/auth/login'])
      console.log("User is not present please register")
    }
  }

  // This function helps in showing and hidding password
  showPasswordToggle() {
    this.checked = !this.checked;
  }

}
