import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CanLogOutGuard, ShouldOpenProfileGuard } from '../guards/login-guards.guard';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
    canDeactivate: [CanLogOutGuard],
    canActivate: [ShouldOpenProfileGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
