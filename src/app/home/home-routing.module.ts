import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ShouldLoginGuard } from '../guards/should-login.guard';
import { ShouldLogOutGuard } from '../guards/should-log-out.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/my-profile',
    pathMatch: 'full'
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
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
