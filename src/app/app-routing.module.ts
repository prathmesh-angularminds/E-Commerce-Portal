import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginGuardsGuard, CanLogOutGuard, ShouldOpenProfileGuard } from './guards/login-guards.guard';

const routes: Routes = [
  
  // Routing if path is '/' or '/auth'
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  
  // Lazy Loading
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivateChild: [LoginGuardsGuard]
  },{
    path: 'my-profile',
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
