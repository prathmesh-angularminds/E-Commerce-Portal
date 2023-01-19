import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsersdataService } from "./usersdata.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpServiceService {
  baseUrl: string = `https://shop-api.ngminds.com`;
  headerObject: object;
  token: string;

  constructor(private http: HttpClient, private userData: UsersdataService) {}

  // Get Function
  get(url: string,params: string = ""): Observable<any> {

    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.get(completePath); 
  }

  // Post Function
  post(url:string,params:string = "",payload: object = {}): Observable<any> {

    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.post(completePath,payload);
  }

  // Delete Function
  delete(url: string): Observable<any> {

    const completePath = `${this.baseUrl}${url}`;
    return this.http.delete(completePath);
  }

  // Patch Function
  patch(url: string,params: string="",payload: any={}): Observable<any> {

    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.patch(completePath,payload)
  }

  // Put Function
  put(url: string, params: string="",payload: any={}): Observable<any> {

    const completePath = `${this.baseUrl}${url}`;
    return this.http.put(completePath,payload);
  }
}

