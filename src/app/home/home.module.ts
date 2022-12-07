import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
  ]
})
export class HomeModule { }
