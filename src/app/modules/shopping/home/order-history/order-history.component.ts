import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  index: number;
  orderId: string;
  total: number;
  orderHistory: any;
  paymentForm: FormGroup;
  orders: any
  text = false;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  limit: number = 5;
  collapseId: string;

  constructor(private httpService: HttpServiceService,private router: Router) { }

  ngOnInit(): void {

    const params = `?page=${1}&limit=${this.limit}`;
    this.setPaymentForm();
    this.getOrderHistory(params);
  }

  get getCardNumber() {
    return this.paymentForm.get("cardNumber");
  }

  get getExpiry() {
    return this.paymentForm.get("expiry");
  }

  get getCVV() {
    return this.paymentForm.get("cvv");
  }

  getOrderHistory(params: string="") {

    const url = "/shop/orders"

    this.httpService.get(url,params).subscribe({
      next: res => {this.orderHistory = res; console.log(this.orderHistory)},
      error: err => console.log(err)
    })
  }

  getSpecificOrder(id: string,index: number) {

    this.text = !this.text;
    this.index = index 
  }

   // show popup code [Completed]
   showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  cancelOrder(id: string) {

    const url = `/shop/orders/cancel/${id}`
    this.httpService.patch(url).subscribe({
      next: res => {this.showPop('Order Deleted Successfully '),this.getOrderHistory()},
      error: err => this.showPop(err.error.message)
    })
  }

  // Payments Function

  setPaymentForm(order: any = {_id: "",total:0}) {

    this.orderId = order._id;
    this.total = order.total;

    this.paymentForm = new FormGroup({
      cardNumber: new FormControl("", [Validators.required]),
      expiry: new FormControl("", [Validators.required]),
      cvv: new FormControl("", [Validators.required]),
    });
    console.log("");
  }

  makePayment() {

    const url = `/shop/orders/confirm/${this.orderId}`;
    let paymentDetails = this.paymentForm.value;
    paymentDetails.nameOnCard = "Demo";

    console.log(paymentDetails);
    console.log(this.orderId)
    this.httpService.put(url, "", paymentDetails).subscribe({
      next: (res) => {
        this.showPop("Payment Done Successfully")
        this.getOrderHistory();
      },
      error: (err) => {this.showPop(err.error.message),console.log(err)},
    });
  }

  getSelected(event: any, page: number, type: string) {
    
    this.limit = type === "limit" ? event.target.value : 10;

    const params =
      type === "sortBy"
        ? `?page=${page}&limit=${this.orders.limit}`
        : `?limit=${this.limit}&page=${page}`;

    this.getOrderHistory(params);
  }

  // function to apply pagination
  applyPagination(page: number) {
    let params = `?limit=${this.limit}&page=${page}`;
    this.getOrderHistory(params);
  }

}
