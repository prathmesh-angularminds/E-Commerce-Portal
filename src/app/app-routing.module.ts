import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./components/error/error.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },

  // Shopping Module
  {
    path: "",
    loadChildren: () =>
      import("./modules/shopping/shopping.module").then(
        (m) => m.ShoppingModule
      ),
  },

  // Seller Module
  {
    path: "seller",
    loadChildren: () =>
      import("./modules/seller/seller.module").then((m) => m.SellerModule),
  },

  {
    path: "**",
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
