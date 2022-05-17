import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedMaterialModule } from './shared-material.module';

import { CollectionCardComponent } from '../components/base-components/cards/collection-card/collection-card.component';
import { NftCardComponent } from '../components/base-components/cards/nft-card/nft-card.component';

@NgModule({
  declarations: [
    CollectionCardComponent,
    NftCardComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CollectionCardComponent,
    NftCardComponent,
    /* SharedMaterialModule */  /* is this have sense? */
  ]
})
export class SharedComponentsModule { }
