import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BasePageComponent } from '../../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent extends BasePageComponent implements OnInit {

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
