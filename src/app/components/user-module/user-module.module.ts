import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';

import { AccountPageComponent } from './account-page/account-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  declarations: [
    AccountPageComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    SharedComponentsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModuleModule { }
