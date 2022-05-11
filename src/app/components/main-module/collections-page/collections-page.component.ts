import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, takeUntil } from 'rxjs';

import { MoralisNftService } from 'src/app/services/moralis/moralis-nft.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

import { CollectionOptions } from 'src/app/services/moralis/moralis-nfts-arrays.models';

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss']
})
export class CollectionsPageComponent extends BasePageComponent implements OnInit {
  public collection_address!: string | null;
  public collection: any;
  public options!: CollectionOptions;
  public nftData!: any[]


  constructor(
    /* public activatedRoute: ActivatedRoute, */
    public moralisService: MoralisNftService,
  ) { 
    super() 
  }

  ngOnInit() {
    this.moralisService.getChoosedObject().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      if (res) {
        localStorage.setItem('collection', JSON.stringify(res));
        this.collection = res;
        console.log("Set Collection ->", this.collection);
      } else {
        let data: string | null = localStorage.getItem('collection');
        if (data) {
          this.collection = JSON.parse(data);
          console.log("Get Collection ->", this.collection);
        }
      }

      this.options = {chain: this.collection.chain, address: this.collection.token_address, limit: 100};
      console.log("Options ->", this.options)
    });

    this.moralisService.loadCollections([this.options]).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.nftData = res[0];
      console.log("NFT Data ->", this.nftData);
    })

  }
}
