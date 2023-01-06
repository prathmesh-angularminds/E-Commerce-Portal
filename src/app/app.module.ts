import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./components/error/error.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonInterceptor } from "./services/common.interceptor";
import { LayoutsModule } from './layouts/layouts.module';
import { SellerModule } from './modules/seller/seller.module';
import { CustNavbarComponent } from './components/cust-navbar/cust-navbar.component';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
