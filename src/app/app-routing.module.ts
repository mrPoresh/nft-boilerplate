import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginTrx, signupTrx } from './router-translation.labels';

import { TestPageComponent } from './components/base-components/test-page/test-page.component';
import { LoginDialogRouteComponent } from './components/auth/login/login-dialog/login-dialog.component';
import { SignupDialogRouteComponent } from './components/auth/signup/signup-dialog/signup-dialog.component';

const loginRoute = {
  path: loginTrx,
  component: LoginDialogRouteComponent
}

const signupRoute = {
  path: signupTrx,
  component: SignupDialogRouteComponent
}

const routes: Routes = [
  { path: '', component: TestPageComponent, children: [
    loginRoute,
    signupRoute,
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
