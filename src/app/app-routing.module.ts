import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ShouldLoginGuard } from './guards/should-login.guard';

const routes: Routes = [
  
  // Routing if path is '/' or '/auth'
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  // Lazy Loading
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },{
    path: 'my-profile',
    canActivate: [ShouldLoginGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path:"**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
