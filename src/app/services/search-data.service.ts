import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  searchValue: string;
  searchObserver: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }


  setSearchValue(value: string) {
  
    this.searchValue = value;
  }

  getSearchValue() {

    return this.searchValue;
  }
}
