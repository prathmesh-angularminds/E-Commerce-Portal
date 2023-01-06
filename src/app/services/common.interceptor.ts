import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UsersdataService } from "./usersdata.service";
import { tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  token: string;
  header: any;

  constructor(private userData: UsersdataService, private router: Router) {}

  // function which handles auth error
  handleAuthError(err: any): Observable<any> {
    if (err.status === 401) {
      this.userData.clearStorage();
      this.router.navigate(["auth/login"]);
    }
    return throwError(err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    var type =
      request.url.substring(29, 38) === "customers"
        ? "customerToken"
        : "sellerToken";
    this.token = this.userData.getToken(type)!;
    this.header = { Authorization: `Bearer ${this.token}` };

    return next.handle(request.clone({ setHeaders: this.header })).pipe(
      catchError((err) => {
        return this.handleAuthError(err);
      })
    );
  }
}
