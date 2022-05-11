import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { CollectionCardComponent } from './cards/collection-card/collection-card.component';
import { NftCardComponent } from './cards/nft-card/nft-card.component';
import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';


@NgModule({
  declarations: [
    CollectionCardComponent,
    NftCardComponent,
    ExploreCollectionsComponent,
    CollectionsPageComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    SharedMaterialModule,
    FlexLayoutModule
  ]
})
export class MainModuleModule { }
