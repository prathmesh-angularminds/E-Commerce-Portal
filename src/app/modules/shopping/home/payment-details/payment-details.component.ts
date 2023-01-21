import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  
  total: any;
  items: any;
  
  constructor(private store: Store<{ cartList: [] , totalAmount:  number}>) { }

  ngOnInit(): void {
    this.getStoreData()
  }

  getStoreData() {
    this.store.select("cartList").subscribe({
      next: (res: any) => {
        this.items = JSON.parse(localStorage.getItem('cart') || "[]");
        this.total = JSON.parse(localStorage.getItem('totalAmount') || "0");
      },
      error: (err) => console.log(err),
    });
  }
}
