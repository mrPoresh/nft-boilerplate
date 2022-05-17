import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';

import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';


@NgModule({
  declarations: [
    ExploreCollectionsComponent,
    CollectionsPageComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    SharedMaterialModule,
    SharedComponentsModule,
    FlexLayoutModule
  ],
  exports: [

  ]
})
export class MainModuleModule { }
