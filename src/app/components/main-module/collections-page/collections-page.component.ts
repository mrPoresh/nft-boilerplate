import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public collection: any = undefined;
  public options!: CollectionOptions;
  public nftData!: any[];


  constructor(
    /* public activatedRoute: ActivatedRoute, */
    public moralisService: MoralisNftService,
    public router: Router,
    public route: ActivatedRoute,
  ) { 
    super() 
  }

  ngOnInit() {
    this.moralisService.getCollectionsByAddress([this.route.snapshot.params['address']]).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      
      this.collection = res[0][0];

      this.options = {chain: this.collection.chain, address: this.collection.token_address, limit: 100};
      console.log("Options ->", this.options);

      this.moralisService.loadCollections([this.options]).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        this.nftData = res[0];
        console.log("NFT Data ->", this.nftData);
      });

    });

  }

  choosedNFT(nft: any) {
    this.moralisService.changeChoosedObject(nft);
    this.router.navigate(['assets' + '/' + nft.token_address + '/' + nft.token_id]);
    console.log("Selected ->", nft);
  }
  
}
