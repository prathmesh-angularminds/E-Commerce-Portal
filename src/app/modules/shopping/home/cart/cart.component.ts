import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { addToCart, deleteProduct, subProduct } from "src/app/actions/addToCart.action";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  
  cartList: any;
  totalAmount: number;
  token: any;

  constructor(private store: Store<{ cartList: [] , totalAmount:  number}>,private router: Router) {}

  ngOnInit(): void {

    this.getStoreData();
    this.token = localStorage.getItem('customerToken') || null;
    console.log(this.token);
  }

  getStoreData() {
    this.store.select("cartList").subscribe({
      next: (res: any) => {
        this.cartList = JSON.parse(localStorage.getItem('cart') || "[]");
        this.totalAmount = JSON.parse(localStorage.getItem('totalAmount') || "0");
      },
      error: (err) => console.log(err),
    });

    this.store.select("totalAmount").subscribe({
      next: (res: any) => {
        this.cartList = JSON.parse(localStorage.getItem('cart') || "[]");
        this.totalAmount = JSON.parse(localStorage.getItem('totalAmount') || "0");
      },
      error: (err) => console.log(err),
    });
  }

  increaseCount(product: any) {
    this.store.dispatch(addToCart(product));
    this.getStoreData();
  }

  decreaseCount(product: any) {
    this.store.dispatch(subProduct(product));
    this.getStoreData();
  }

  removeProduct(product: any) {
    this.store.dispatch(deleteProduct(product))
  }

  goToLogin() {

    localStorage.removeItem('customerToken');
    this.router.navigate(['/auth/login']);
  }
}
