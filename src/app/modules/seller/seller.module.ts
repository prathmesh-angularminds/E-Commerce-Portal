import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerLayoutModule } from 'src/app/layouts/seller-layout/seller-layout.module';
import { ShoppingLayoutModule } from 'src/app/layouts/shopping-layout/shopping-layout.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SellerLayoutModule,
    // ShoppingLayoutModule
  ],
})
export class SellerModule { }
