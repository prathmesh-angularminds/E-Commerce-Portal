import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Router } from "@angular/router";
import { SellerAppLayoutComponent } from "../layouts/seller-layout/app/app.component";
import { ShoppingAppLayoutComponent } from "../layouts/shopping-layout/app/app.component";

@Injectable({
  providedIn: "root",
})
export class LoginGuardsGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let token = localStorage.getItem('sellerToken');
    if (token === undefined || token === null) {
      localStorage.removeItem('sellerToken');
      return true;
    } else {
      this.router.navigate(["/seller/app/my-profile"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class CanLogOutGuard implements CanDeactivate<SellerAppLayoutComponent> {
  constructor(private router: Router) {}

  canDeactivate(component: ShoppingAppLayoutComponent): boolean {
    
    let token = localStorage.getItem('sellerToken');

    if (token === null || token === undefined) {
      return true;
      localStorage.clear();
    } else {
      this.router.navigate(["/seller/app/my-profile"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class ShouldOpenProfileGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let token = localStorage.getItem('sellerToken');

    if (token ==  null || token == undefined) {
      this.router.navigate(["/seller/auth/login"]);
      return false;
    } else {
      return true;
    }
  }
}

// Shopping Guard

@Injectable({
  providedIn: "root",
})
export class CustomerLoginGuardsGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let token = localStorage.getItem('customerToken');

    if (token === undefined || token === null) {
      localStorage.removeItem('customerToken');
      return true;
    } else {
      this.router.navigate(["/app/product/product-list"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class CustomerCanLogOutGuard implements CanDeactivate<ShoppingAppLayoutComponent> {
  constructor(private router: Router) {}

  canDeactivate(component: ShoppingAppLayoutComponent): boolean {
    
    let token = localStorage.getItem('customerToken');

    if (token === null || token === undefined) {
      localStorage.clear();
      return true;
    } else {
      this.router.navigate(["/app/product/product-list"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class CustomerShouldOpenProfileGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let token = localStorage.getItem('customerToken');

    if (token ==  null || token == undefined) {
      this.router.navigate(["/app/product/product-list"]);  
      return false;
    } else {
      return true;
    }
  }
}
