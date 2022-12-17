import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./components/error/error.component";
import {
  LoginGuardsGuard,
  CanLogOutGuard,
  ShouldOpenProfileGuard,
} from "./guards/login-guards.guard";
import { LayoutAppComponent } from "./layouts/app/app.component";
import { LayoutAuthComponent } from "./layouts/auth/auth.component";

const routes: Routes = [
  // Routing if path is '/' or '/auth'
  // {
  //   path: '',
  //   redirectTo: 'auth/login',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'auth',
  //   redirectTo: 'auth/login',
  //   pathMatch: 'full'
  // },

  // // Lazy Loading
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  //   canActivateChild: [LoginGuardsGuard]
  // },{
  //   path: 'home',
  //   loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  // },
  // {
  //   path:"**",
  //   component: ErrorComponent
  // }

  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "auth",
    component: LayoutAuthComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/auth/auth.module").then((m) => m.AuthModule),
          canActivateChild: [LoginGuardsGuard],
      },
    ],
  },
  {
    path: "app",
    component: LayoutAppComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/home/home.module").then((m) => m.HomeModule),
          canActivate: [ShouldOpenProfileGuard],
          canDeactivate: [CanLogOutGuard]
      },
    ],
  },
  {
    path: "**",
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
