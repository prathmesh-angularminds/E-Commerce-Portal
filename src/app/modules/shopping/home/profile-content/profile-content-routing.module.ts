import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ProfileInfoComponent } from "./profile-info/profile-info.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";
import { AddAddressComponent } from "./add-address/add-address.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UpdateAddressComponent } from "./update-address/update-address.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileInfoComponent,
  },
  {
    path: "update-info",
    component: ProfileUpdateComponent,
  },
  {
    path: "add-address",
    component: AddAddressComponent,
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
  },
  {
    path: "update-address",
    component: UpdateAddressComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileContentRoutingModule {}
