import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor() { 

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

  }

  ngOnInit(): void {
  }

  userLogined():void {

    console.log("deded");
    console.log(this.loginForm.value);
  }

}
