import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginGuardsGuard } from 'src/app/guards/login-guards.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'seller/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardsGuard],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [LoginGuardsGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [LoginGuardsGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
