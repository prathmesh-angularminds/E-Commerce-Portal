import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanLogOutGuard, ShouldOpenProfileGuard } from 'src/app/guards/login-guards.guard';
import { SellerAuthLayoutComponent } from 'src/app/layouts/seller-layout/auth/auth.component';
import { SellerAppLayoutComponent } from 'src/app/layouts/seller-layout/app/app.component';
  

const routes: Routes = [
  {
    path: "seller",
    redirectTo: "seller/auth",
    pathMatch: "full",
  },
  {
    path: "auth",
    component: SellerAuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "app",
    component: SellerAppLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
        canActivate: [ShouldOpenProfileGuard],
        canDeactivate: [CanLogOutGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]

})
export class SellerRoutingModule { }
