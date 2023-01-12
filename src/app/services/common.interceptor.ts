import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UsersdataService } from "./usersdata.service";
import { Router } from "@angular/router";

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  token: string;
  header: any;

  constructor(private userData: UsersdataService, private router: Router) {
    console.log("In Interceptor Const");

  }

  // function which handles auth error
  handleAuthError(err: any, type: string): Observable<any> {
    const path: string =
      type === "customerToken" ? "auth/login" : "seller/auth/login";

    if (err.status === 401) {
      this.userData.clearStorage();
      this.router.navigate([path]);
    }
    return throwError(() => err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    var type = request.url.includes(".com/shop")
      ? "customerToken"
      : request.url.includes(".com/customers")
      ? "customerToken"
      : request.url.includes(".com/users")
      ? "sellerToken"
      : "sellerToken";


    this.token = this.userData.getToken(type)!;
    this.header = { Authorization: `Bearer ${this.token}` };
    console.log("In Interceptor");

    const interceptor = next.handle(request.clone({ setHeaders: this.header })).pipe(
      catchError((err) => {
        return this.handleAuthError(err, type);
      })
    );

    console.log(interceptor.subscribe({
      next: (res) => console.log("Interceptor: ",res)
    }));


    return interceptor;
  }
}
