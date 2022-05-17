import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginTrx, signupTrx, accountTrx, exploreTrx } from './router-translation.labels';

//import { TestPageComponent } from './components/base-components/test-page/test-page.component';
import { LoginDialogRouteComponent } from './components/auth/login/login-dialog/login-dialog.component';
import { SignupDialogRouteComponent } from './components/auth/signup/signup-dialog/signup-dialog.component';
import { AccountPageComponent } from './components/user-module/account-page/account-page.component';
import { HomePageComponent } from './components/base-components/home-page/home-page.component';

export const loginRoute = {
  path: loginTrx,
  component: LoginDialogRouteComponent
}

export const signupRoute = {
  path: signupTrx,
  component: SignupDialogRouteComponent
}

const mainModuleRoute = { path: '', loadChildren: () => import('./components/main-module/main-module.module').then(m => m.MainModuleModule) }
const userModuleRoute = { path: 'account', loadChildren: () => import('./components/user-module/user-module.module').then(m => m.UserModuleModule) }

const routes: Routes = [
  { 
    path: '', component: HomePageComponent, children: [
      loginRoute,
      signupRoute,
    ] 
  },
  mainModuleRoute,
  userModuleRoute,
  { 
    path: '**', redirectTo: '/' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
