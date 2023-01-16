import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CustomersProfileComponent } from './customers-profile/customers-profile.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    CustomersProfileComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
