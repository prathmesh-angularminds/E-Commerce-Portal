import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from "ng-recaptcha";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [ReCaptchaV3Service,{
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: "6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI",
  },]
})
export class AuthModule { }
