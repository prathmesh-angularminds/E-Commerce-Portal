import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/product/product-list',
    pathMatch: 'full'
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsRoutingModule { }
