import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { CustomerLoginGuardsGuard } from "src/app/guards/login-guards.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [CustomerLoginGuardsGuard],
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [CustomerLoginGuardsGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
