import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UsersdataService } from "../services/usersdata.service";
import { Router } from "@angular/router";
import { MyProfileComponent } from "../home/my-profile/my-profile.component";

@Injectable({
  providedIn: "root",
})
export class LoginGuardsGuard implements CanActivateChild {
  constructor(private usersData: UsersdataService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("Auth child");
    let user = this.usersData.getUser();
    if (user == null || user== undefined) {
      return true;
    } else {
      this.router.navigate(["/my-profile"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class CanLogOutGuard implements CanDeactivate<MyProfileComponent> {
  constructor(private usersData: UsersdataService, private router: Router) {}

  canDeactivate(component: MyProfileComponent): boolean {
    let user = this.usersData.getUser();

    console.log(user);

    if (user == null || user == undefined) {
      return true;
    } else {
      this.router.navigate(["/my-profile"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class ShouldOpenProfileGuard implements CanActivate {
  constructor(private usersData: UsersdataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let user = this.usersData.getUser();

    if (user == null || user == undefined) {
      this.router.navigate(["/auth/login"]);
      return false;
    } else {
      return true;
    }
  }
}
