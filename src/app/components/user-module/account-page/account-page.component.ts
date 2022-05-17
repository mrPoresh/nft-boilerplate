import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { MoralisNftService } from 'src/app/services/moralis/moralis-nft.service';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';

import { CollectionOptions } from 'src/app/services/moralis/moralis-nfts-arrays.models';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent extends BasePageComponent implements OnInit {

  public User: any; //anotation!
  public options!: CollectionOptions;  // for each acc make loop
  public nftData!: any[];

  constructor(
    public moralisUserService: MoralisUserService,
    public moralisNftService: MoralisNftService
  ) { super() }

  ngOnInit() {
    this.User = this.moralisUserService.getUser();
    console.log("Acc Page, user ->", this.User);

    this.options = {chain: "rinkeby", address: this.User.attributes.ethAddress}

    this.moralisNftService.loadUsersNFTs([this.options]).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.nftData = res[0];
      console.log("NFT Data ->", this.nftData);
    })
  }

}
