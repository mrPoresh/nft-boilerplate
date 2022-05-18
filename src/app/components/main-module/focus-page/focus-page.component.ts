import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { MoralisNftService } from 'src/app/services/moralis/moralis-nft.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

import { NFTsOptions, NFTData, OpenSeaPluginOptions } from 'src/app/services/moralis/moralis-nfts-arrays.models';

@Component({
  selector: 'app-focus-page',
  templateUrl: './focus-page.component.html',
  styleUrls: ['./focus-page.component.scss']
})
export class FocusPageComponent extends BasePageComponent implements OnInit {

  public nftData: any;         //
  public nftPluginData: any;   //
  public nftOrders: any;       //
  public nftTradePrices: any;  //

  public nftDataOptions!: NFTsOptions;
  public nftPluginOptions!: OpenSeaPluginOptions;
  public nftOrdersOptions!: OpenSeaPluginOptions;

  constructor(
    public route: ActivatedRoute,
    public moralisNFTService: MoralisNftService,
  ) { super() }

  ngOnInit() {

    this.nftDataOptions = {
      chain: 'rinkeby',
      address: this.route.snapshot.params['address'],
      token_id: this.route.snapshot.params['id'],
    };

    this.nftPluginOptions = {
      network: 'testnet', 
      tokenAddress: this.route.snapshot.params['address'], 
      tokenId: this.route.snapshot.params['id'],
    }

    this.nftOrdersOptions = {
      network: 'testnet', 
      tokenAddress: this.route.snapshot.params['address'], 
      tokenId: this.route.snapshot.params['id'],
      orderSide: 1,
      page: 0,
    }

    this.moralisNFTService.loadNFT(this.nftDataOptions).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.nftData = res;
      console.log('NFT Data ->', this.nftData);
    });

    this.moralisNFTService.initPlugins().then(() => {
      this.moralisNFTService.getOpenSeaAsset(this.nftPluginOptions).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        this.nftPluginData = res;
        console.log('Plugin Asset ->', this.nftPluginData);
      });

      this.moralisNFTService.getOpenSeaOrders(this.nftOrdersOptions).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: res => {
          this.nftOrders = res;
          console.log('Plugin Orders ->', this.nftOrders);
        },
        error: error => {
          this.nftOrders = undefined;
          console.log('Plugin Orders ->', this.nftOrders);
          console.log(error);
        },
      });

      this.moralisNFTService.getWalletTokenIdTransfers(this.nftDataOptions).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        this.nftTradePrices = res;
        console.log('Trade prices ->', this.nftTradePrices);
      });
    });
  }

}
