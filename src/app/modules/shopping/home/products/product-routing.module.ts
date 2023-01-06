import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes : Routes = [
  {
    path: "product-list",
    component: ProductListComponent,
  },
  {
    path: "product-details",
    component: ProductDetailsComponent
  }
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductRoutingModule { }
