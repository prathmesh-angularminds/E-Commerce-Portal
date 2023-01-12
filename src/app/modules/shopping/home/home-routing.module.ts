import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CustomersProfileComponent } from "./customers-profile/customers-profile.component";

const routes: Routes = [
  {
    path: "app",
    redirectTo: "product",
    pathMatch: "full",
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
