import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterServiceService {
  show:BehaviorSubject<any> = new BehaviorSubject({});
  constructor() { }

  showPopUp(type:any , message:any){
    this.show.next({type, message});
    this.show.subscribe(d=>{
      console.log(d,"jhsfcuyjksfku");
    })
  }
}
