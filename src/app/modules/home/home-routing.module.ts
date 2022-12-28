import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UsersComponent } from './users/users.component';
import { LayoutAppComponent } from 'src/app/layouts/app/app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/my-profile',
    pathMatch: 'full'
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        loadChildren: () => import('./products/products.module').then((m) => {return m.ProductsModule})
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
