import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: [];

  constructor(private store: Store<{cartList: []}>) { }

  ngOnInit(): void {
  
    this.store.select('cartList').subscribe({
      next: (res: any) => {this.cartList = res.cart;console.log("cart:",res)},
      error: err => console.log(err)
    })
  }

}
