import { Component, OnInit } from '@angular/core';
import { UsersdataService } from 'src/app/services/usersdata.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  loggedInUser: {};
  constructor(private usersData: UsersdataService) { }

  ngOnInit(): void {
    this.loggedInUser = this.usersData.getUser();
  }

  userLoggedOut(): void {

    console.log("Logout")
    let emptyUser = {
      fullName: '',
      companyName: '',
      password: '',
      email: '',
      token: ''
    };

    this.usersData.setUser(emptyUser);
  }
}
