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

  setHeader() {

    this.token = this.userData.getToken()!;
    this.headerObject = {headers: { Authorization: `Bearer ${this.token}` }}
  }

  setToDB(userData: any, url: string) {
    return this.http.post(`${this.baseUrl}${url}`, userData);
  }

  // Set seller to database
  setSellerToDB(sellerData: any, url: string) {

    this.setHeader();
    return this.http.post(`${this.baseUrl}${url}`, sellerData,this.headerObject);
  }

  // Get Function
  get(url: string,params: string = ""): Observable<any> {

    this.setHeader();
    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.get(completePath,this.headerObject);
  }

  // Post Function
  post(url:string,params:string = "",payload: object = {}): Observable<any> {

    this.setHeader();
    console.log(this.headerObject)
    const completePath = `${this.baseUrl}${url}`;
    console.log(completePath)
    return this.http.post(completePath,payload,this.headerObject);
  }

  // Delete Function
  delete(params: string): Observable<any> {

    this.setHeader();
    const completePath = `${this.baseUrl}${params}`;
    return this.http.delete(completePath,this.headerObject);
  }

  // Patch Function
  patch(url: string,params: string,payload: any): Observable<any> {

    this.setHeader();
    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.patch(completePath,payload,this.headerObject)
  }
}

