import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsersdataService } from "./usersdata.service";

@Injectable({
  providedIn: "root",
})
export class HttpServiceService {
  baseUrl = `https://shop-api.ngminds.com`;

  constructor(private http: HttpClient, private userData: UsersdataService) {}

  setToDB(userData: any, url: string) {
    return this.http.post(`${this.baseUrl}${url}`, userData);
  }

  getDBData() {
    let token = this.userData.getToken();
    return this.http.get(`${this.baseUrl}/auth/self`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
