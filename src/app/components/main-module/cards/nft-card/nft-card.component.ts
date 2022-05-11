import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss']
})
export class NftCardComponent extends BasePageComponent implements OnInit {

  choosen: boolean = false;

  @Input() NFTData: any;
  @Output() choosedCollection = new EventEmitter<any>();

  constructor() { super() }

  ngOnInit() {
    
  }

  onClick(NFTData: any) {
    this.choosedCollection.emit(NFTData);
  }
}
