import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree,
} from "@angular/router";
import { UsersdataService } from "../services/usersdata.service";
import { Router } from "@angular/router";
import { LayoutAppComponent } from "../layouts/app/app.component";

@Injectable({
  providedIn: "root",
})
export class LoginGuardsGuard implements CanActivateChild {
  constructor(private usersData: UsersdataService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let token = localStorage.getItem('token');
    if (token === undefined || token === null) {
      return true;
    } else {
      this.router.navigate(["/app/my-profile"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class CanLogOutGuard implements CanDeactivate<LayoutAppComponent> {
  constructor(private usersData: UsersdataService, private router: Router) {}

  canDeactivate(component: LayoutAppComponent): boolean {
    
    let token = localStorage.getItem('token');

    if (token === null || token === undefined) {
      return true;
    } else {
      this.router.navigate(["/app/my-profile"]);
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

    let token = localStorage.getItem('token');

    if (token ==  null || token == undefined) {
      this.router.navigate(["/auth/login"]);
      return false;
    } else {
      return true;
    }
  }
}
