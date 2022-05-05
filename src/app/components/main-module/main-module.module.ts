import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';


@NgModule({
  declarations: [
    ExploreCollectionsComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule
  ]
})
export class MainModuleModule { }
