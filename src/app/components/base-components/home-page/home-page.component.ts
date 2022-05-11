import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasePageComponent } from '../base-page/base-page.component';
import { MoralisMainService } from 'src/app/services/moralis/moralis-main.service';

import { exploreTrx } from 'src/app/router-translation.labels';
import { HomeBanersNFT } from 'src/app/services/moralis/moralis-nfts-arrays.models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BasePageComponent implements OnInit {

  /* https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/660.png */

  constructor(
    public router: Router,
    public moralisService: MoralisMainService
  ) { super() }

  ngOnInit() {
/*     this.moralisService.getTokenIdMetadata(HomeBanersNFT[0]).subscribe(
      res => {
        if (res.metadata) {
          this.metadata.name = res.metadata?.split(',')[0]
          this.metadata.image = res.metadata?.split(',')[1]
          console.log("Res ->", this.metadata)
        }
      }
    ) */
  }

  exploreCollections() {
    this.router.navigate([exploreTrx]);
  }

}
