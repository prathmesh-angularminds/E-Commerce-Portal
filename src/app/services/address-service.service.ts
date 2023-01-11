import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  headers = {
    'X-CSCAPI-KEY': 'OXBaSGJva0ZRSEJlS1dtR2JHWEM2UGtpNnpiNmNzNnpGY01acTQ1TA=='
  }
  path: string = "https://api.countrystatecity.in/v1/countries/IN"
  
  constructor(private http: HttpClient) {}

  get(params: string): Observable<any> {

    const completedPath: string = `${this.path}${params}`;
    return this.http.get(completedPath,{headers: this.headers});
  }
}
