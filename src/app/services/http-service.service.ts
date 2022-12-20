import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsersdataService } from "./usersdata.service";

@Injectable({
  providedIn: "root",
})
export class HttpServiceService {
  baseUrl: string = `https://shop-api.ngminds.com`;
  headerObject: object;
  token: string;

  constructor(private http: HttpClient, private userData: UsersdataService) {

    this.token = this.userData.getToken()!;
    this.headerObject = {headers: { Authorization: `Bearer ${this.token}` }}
  }

  setToDB(userData: any, url: string) {
    return this.http.post(`${this.baseUrl}${url}`, userData);
  }

  // Set seller to database
  setSellerToDB(sellerData: any, url: string) {
    return this.http.post(`${this.baseUrl}${url}`, sellerData,this.headerObject);
  }

  // Get Function
  get(url: string,params: string = "") {

    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.get(completePath,this.headerObject);
  }

  // Post Function
  post(url:string,params:string = "",payload: object = {}) {

    const completePath = `${this.baseUrl}${url}`;
    console.log(payload)
    return this.http.post(completePath,payload,this.headerObject);
  }

  // Delete Function
  delete(params: string) {

    const completePath = `${this.baseUrl}${params}`;
    return this.http.delete(completePath,this.headerObject);
  }

  // Patch Function
  patch(url: string,params: string,payload: any) {

    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.patch(completePath,payload,this.headerObject)
  }
}

