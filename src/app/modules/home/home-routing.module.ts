import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CanLogOutGuard, ShouldOpenProfileGuard } from '../../guards/login-guards.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  
  {
    path: 'my-profile',
    component: MyProfileComponent,
  }, {

    path: 'users',
    component: UsersComponent,
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
