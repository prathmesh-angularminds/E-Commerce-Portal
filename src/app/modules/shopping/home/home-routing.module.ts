import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CustomersProfileComponent } from "./customers-profile/customers-profile.component";
import { CustomerShouldOpenProfileGuard } from "src/app/guards/login-guards.guard";
import { CartComponent } from "./cart/cart.component";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { CheckOutComponent } from "./check-out/check-out.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "product",
    pathMatch: "full",
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [CustomerShouldOpenProfileGuard]
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [CustomerShouldOpenProfileGuard]
  },
  {
    path: "product",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./products/products.module").then((m) => {
            return m.ProductsModule;
          }),
      },
    ],
  },
  {
    path: "my-profile",
    component: CustomersProfileComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./profile-content/profile-content.module").then(
            (m) => m.ProfileContentModule
          ),
          canActivate: [CustomerShouldOpenProfileGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
