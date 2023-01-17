import { Component, OnInit } from "@angular/core";
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

  constructor(private store: Store<{ cartList: [] , totalAmount:  number}>) {}

  ngOnInit(): void {

    this.getStoreData();
  }

  getStoreData() {
    this.store.select("cartList").subscribe({
      next: (res: any) => {
        console.log("Cart List:",res);
        this.cartList = JSON.parse(localStorage.getItem('cart') || "");
        this.totalAmount = JSON.parse(localStorage.getItem('totalAmount') || "");
      },
      error: (err) => console.log(err),
    });

    this.store.select("totalAmount").subscribe({
      next: (res: any) => {
        console.log("Total Amount",res);
        this.cartList = JSON.parse(localStorage.getItem('cart') || "");
        this.totalAmount = JSON.parse(localStorage.getItem('totalAmount') || "");
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
}
