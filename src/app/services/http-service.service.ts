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

  getDBData() {
    return this.http.get(`${this.baseUrl}/auth/self`,this.headerObject);
  }

  // Set seller to database
  setSellerToDB(sellerData: any, url: string) {
    return this.http.post(`${this.baseUrl}${url}`, sellerData,this.headerObject);
  }

  getSellers(params: string) {

    const url="/users?";
    const completePath = `${this.baseUrl}${url}${params}`;
    return this.http.get(completePath,this.headerObject);
  }

  deleteSeller(userId: string) {

    const url=`/users/${userId}`;
    return this.http.delete(`${this.baseUrl}${url}`,this.headerObject);
  }

  updateSeller(userId:string,url: string,payload: any) {

    const finalUrl = `${url}${userId}`;
    return this.http.patch(`${this.baseUrl}${finalUrl}`,payload,this.headerObject)
  }
}

