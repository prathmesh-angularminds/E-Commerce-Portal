import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CustomersProfileComponent } from './customers-profile/customers-profile.component';
import { ProfileContentModule } from './profile-content/profile-content.module';



@NgModule({
  declarations: [
    CustomersProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
