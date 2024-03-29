import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { SellerLayoutModule } from './seller-layout/seller-layout.module';
import { ShoppingLayoutModule } from './shopping-layout/shopping-layout.module';

@NgModule({
  declarations: [],
  exports: [
    SellerLayoutModule,
    ShoppingLayoutModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})

export class LayoutsModule {}
