import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MyProfileComponent } from '../home/my-profile/my-profile.component';
import { UsersdataService } from '../services/usersdata.service';

@Injectable({
  providedIn: 'root'
})
export class ShouldLogOutGuard implements CanDeactivate<MyProfileComponent> {
  
  constructor(private userData: UsersdataService) {

  }

  canDeactivate(
    component: MyProfileComponent,
    ): boolean {

    //history.pushState(null,'');
    return this.userData.shouldLogout;
  }
  
}
