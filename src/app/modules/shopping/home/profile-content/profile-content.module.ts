import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileContentRoutingModule } from './profile-content-routing.module';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateAddressComponent } from './update-address/update-address.component';



@NgModule({
  declarations: [
    ProfileInfoComponent,
    ProfileUpdateComponent,
    AddAddressComponent,
    ChangePasswordComponent,
    UpdateAddressComponent
  ],
  imports: [
    CommonModule,
    ProfileContentRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileContentModule { }
