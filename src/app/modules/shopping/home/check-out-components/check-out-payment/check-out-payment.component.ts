import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpServiceService } from "src/app/services/http-service.service";

@Component({
  selector: "app-check-out-payment",
  templateUrl: "./check-out-payment.component.html",
  styleUrls: ["./check-out-payment.component.scss"],
})
export class CheckOutPaymentComponent implements OnInit {
  orderId: any;
  errorMsg: string = "";
  errorMsgClass: { snackbar: boolean; show: boolean } = {
    snackbar: true,
    show: false,
  };
  paymentForm: FormGroup;
  items: any;
  total: any;

  constructor(
    private httpService: HttpServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = localStorage.getItem("orderId") || "";
    this.setPaymentForm();
    this.getItems();
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

  getItems() {
    this.total = parseInt(
      JSON.parse(localStorage.getItem("totalAmount") || "0")
    );
  }

  setPaymentForm() {
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl("", [Validators.required]),
      expiry: new FormControl("", [Validators.required]),
      cvv: new FormControl("", [Validators.required]),
    });
    console.log("");
  }

  // show popup code [Completed]
  showPop(message: string) {
    this.errorMsgClass.show = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsgClass.show = false;
    }, 3000);
  }

  makePayment() {

    const url = `/shop/orders/confirm/${this.orderId}`;
    let paymentDetails = this.paymentForm.value;
    paymentDetails.nameOnCard = "Demo";

    console.log(paymentDetails);
    console.log(this.orderId)
    this.httpService.put(url, "", paymentDetails).subscribe({
      next: (res) => {
        console.log(res)
        this.showPop("Payment Done Successfully"),
        localStorage.removeItem('cart');
        localStorage.removeItem('orderId');
        localStorage.removeItem('totalAmount');
          setTimeout(() => this.router.navigate(["/app/order-history"]), 4000);
      },
      error: (err) => {this.showPop(err.error.message),console.log(err)},
    });
  }
}
