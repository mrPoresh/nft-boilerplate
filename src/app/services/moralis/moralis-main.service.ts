import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';

export type User = Moralis.User<Moralis.Attributes>;

@Injectable({
  providedIn: 'root'
})
export class MoralisMainService {

  constructor() { }

  async init() {
    await Moralis.start({
      appId: environment.moralis.appId,
      serverUrl: environment.moralis.serverUrl,
    });

    Moralis.initPlugins();

    console.log("App Id ->", environment.moralis.appId);
    console.log("Server ->", environment.moralis.serverUrl);
  }

  foo() {
    return of(Moralis.Plugins['opensea'].getOrders({
      network: 'testnet',
      tokenAddress: '0xb74bf94049d2c01f8805b8b15db0909168cabf46',
      tokenId: '240',
      orderSide: '0', // 0 for offers, 1 for auctions
      //page: 1, // pagination shows 20 orders each page
    }));
  }

}
