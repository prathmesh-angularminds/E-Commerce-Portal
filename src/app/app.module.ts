import { NgModule } from '@angular/core';

import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./components/error/error.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonInterceptor } from "./services/common.interceptor";

// NGRX SETUP
import { StoreModule } from '@ngrx/store';
import { cartReducer, totalAmount } from './reducers/cart.reducer';
import { PaymentDetailsComponent } from './modules/shopping/home/payment-details/payment-details.component';
import { ToasterModule } from './components/toaster/toaster.module';


@NgModule({
  declarations: [AppComponent, ErrorComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToasterModule,
    StoreModule.forRoot({cartList: cartReducer,totalAmount: totalAmount}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports:[]
})

export class AppModule {}
