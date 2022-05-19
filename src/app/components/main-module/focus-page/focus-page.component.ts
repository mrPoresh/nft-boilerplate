import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { MoralisNftService } from 'src/app/services/moralis/moralis-nft.service';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

import { NFTsOptions, NFTData, OpenSeaPluginOptions, OpenSeaPluginBuyOrder } from 'src/app/services/moralis/moralis-nfts-arrays.models';

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
  public nftBuyOrderOptions!: OpenSeaPluginBuyOrder;

  constructor(
    public route: ActivatedRoute,
    public moralisNFTService: MoralisNftService,
    public moralisUserService: MoralisUserService,
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
    };

    this.nftOrdersOptions = {
      network: 'testnet', 
      tokenAddress: this.route.snapshot.params['address'], 
      tokenId: this.route.snapshot.params['id'],
      orderSide: 1,
      page: 0,
    };

    this.moralisNFTService.loadNFT(this.nftDataOptions).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.nftData = res;
      console.log('NFT Data ->', this.nftData);
    });

    this.moralisNFTService.getWalletTokenIdTransfers(this.nftDataOptions).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.nftTradePrices = res;
      console.log('Trade prices ->', this.nftTradePrices);
    });

    this.moralisNFTService.initPlugins().then(() => {
      this.moralisNFTService.getOpenSeaAsset(this.nftPluginOptions).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        this.nftPluginData = res;
        console.log('Plugin Asset ->', this.nftPluginData);
      });

      this.moralisNFTService.getOpenSeaOrders(this.nftOrdersOptions).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: res => {
          if (res.orders[0]) {
            this.nftOrders = res;
          } else {
            this.nftOrders = undefined;
          }
          console.log('Plugin Orders ->', this.nftOrders);
        },
        error: error => {
          this.nftOrders = undefined;
          console.log('Plugin Orders ->', this.nftOrders);
          console.log(error);
        },
      });

    });

  }

  makeBuyOrder() {  /* test */
    this.nftBuyOrderOptions = {
      network: 'testnet',
      tokenAddress: this.route.snapshot.params['address'],
      tokenId: this.route.snapshot.params['id'],
      tokenType: this.nftData.contract_type,
      amount: 0.4,
      userAddress: this.moralisUserService.getUser()?.attributes['ethAddress'],
      paymentTokenAddress: this.nftData.owner_of,
    };

    console.log('opt', this.nftBuyOrderOptions)

    this.moralisNFTService.createOpenSeaBuyOrder(this.nftBuyOrderOptions).subscribe(res => {
      console.log('res', res);
    });
  }

}
