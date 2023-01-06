import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustNavbarComponent } from "src/app/components/cust-navbar/cust-navbar.component";
import { ShoppingModule } from "src/app/modules/shopping/shopping.module";
import { ShoppingAppLayoutComponent } from "./app/app.component";
import { ShoppingAuthLayoutComponent } from "./auth/auth.component";

@NgModule({
  declarations: [ShoppingAppLayoutComponent, ShoppingAuthLayoutComponent,CustNavbarComponent],
  imports: [RouterModule,ReactiveFormsModule,ShoppingModule,CommonModule],
  exports: [ShoppingAppLayoutComponent,ShoppingAuthLayoutComponent],
})
export class ShoppingLayoutModule {}
