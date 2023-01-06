import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SellerAppLayoutComponent } from "./app/app.component";
import { SellerAuthLayoutComponent } from "./auth/auth.component";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SellerAppLayoutComponent,
    SellerAuthLayoutComponent,
    NavbarComponent,
  ],
  exports: [SellerAppLayoutComponent, SellerAuthLayoutComponent,NavbarComponent],
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
})
export class SellerLayoutModule {}
