import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedMaterialModule } from './modules/shared-material.module';
import { BaseComponent } from './components/base-components/base/base.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { CloseDialogButtonComponent } from './components/base-components/dialogs/close-dialog-button/close-dialog-button.component';
import { ConfirmDialogComponent } from './components/base-components/dialogs/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './components/base-components/dialogs/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './components/base-components/dialogs/success-dialog/success-dialog.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { SlideMenuButtonComponent } from './components/slide-menu/slide-menu-button/slide-menu-button.component';
import { SlideMenuItemsComponent } from './components/slide-menu/slide-menu-items/slide-menu-items.component';
import { FooterComponent } from './components/base-components/footer/footer.component';
import { LogoutButtonComponent } from './components/auth/logout-button/logout-button.component';
import { LoginDialogComponent } from './components/auth/login/login-dialog/login-dialog.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { LoginButtonComponent } from './components/auth/login/login-button/login-button.component';
import { SignupDialogComponent } from './components/auth/signup/signup-dialog/signup-dialog.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';
import { SignupButtonComponent } from './components/auth/signup/signup-button/signup-button.component';
import { TestPageComponent } from './components/base-components/test-page/test-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BasePageComponent,
    CloseDialogButtonComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    SlideMenuComponent,
    SlideMenuButtonComponent,
    SlideMenuItemsComponent,
    FooterComponent,
    LogoutButtonComponent,
    LoginDialogComponent,
    LoginComponent,
    LoginButtonComponent,
    SignupDialogComponent,
    SignupFormComponent,
    SignupButtonComponent,
    TestPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
