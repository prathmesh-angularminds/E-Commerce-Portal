import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

// Google Api Login Imports
import { RecaptchaModule } from "ng-recaptcha";
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from "ng-recaptcha";
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from "angularx-social-login";
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';


const google_clientid = "893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com";

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, ResetPasswordComponent, VerifyEmailComponent],
  imports: [CommonModule, AuthRoutingModule, RouterModule, ReactiveFormsModule,SocialLoginModule,CoolSocialLoginButtonsModule,    RecaptchaModule
  ],
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: "6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI",
    },{
      provide: "SocialAuthServiceConfig",
      useValue: {
         authLogin: false,
         providers: [{
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            google_clientid 
          )
         }]
      }as SocialAuthServiceConfig
    }
  ],
})
export class AuthModule {}
