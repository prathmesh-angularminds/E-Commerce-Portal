import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CustomersProfileComponent } from './customers-profile/customers-profile.component';
import { CartComponent } from './cart/cart.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckOutLoginComponent } from './check-out-components/check-out-login/check-out-login.component';
import { CheckOutAddressComponent } from './check-out-components/check-out-address/check-out-address.component';
import { CheckOutPaymentComponent } from './check-out-components/check-out-payment/check-out-payment.component';


@NgModule({
  declarations: [
    CustomersProfileComponent,
    CartComponent,
    OrderHistoryComponent,
    CheckOutComponent,
    CheckOutLoginComponent,
    CheckOutAddressComponent,
    CheckOutPaymentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class HomeModule { }
