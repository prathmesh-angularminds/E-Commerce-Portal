import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAuthComponent } from './auth/auth.component';
import { LayoutAppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import {NavbarComponent} from './../components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutAuthComponent,
    LayoutAppComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [LayoutAppComponent, LayoutAuthComponent]
})
export class LayoutsModule { }
