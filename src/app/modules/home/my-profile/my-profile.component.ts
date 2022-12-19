import { Component, OnInit } from '@angular/core';
import { UsersdataService } from 'src/app/services/usersdata.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  loggedInUser: any;
  constructor(private usersData: UsersdataService, private httpService: HttpServiceService) { 
  
  this.httpService.getDBData().subscribe(data => {
      this.usersData.setUser(data)
      this.loggedInUser = this.usersData.getUser();
      console.log(this.loggedInUser);
    });

  }

  ngOnInit(): void {
  }

  userLoggedOut(): void {
    console.log("ErrorComponent")
    this.usersData.clearStorage();
  }
}
