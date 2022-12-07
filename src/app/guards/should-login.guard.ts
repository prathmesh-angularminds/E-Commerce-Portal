import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersdataService } from '../services/usersdata.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShouldLoginGuard implements CanActivate {
  
  constructor(private usersdata: UsersdataService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.usersdata.shouldLogin) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
      

  }
  
}


@Injectable({
  providedIn: 'root'
})
class ShouldLogOutGuard implements CanActivate {
  
  constructor(private usersdata: UsersdataService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.usersdata.shouldLogin) {
        return true;
      } else {
        this.router.navigate(['/my-profile']);
        return false;
      }
  }
}
