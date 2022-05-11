import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { from, map, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

export type User = Moralis.User<Moralis.Attributes>;

@Injectable({
  providedIn: 'root'
})
export class MoralisMainService {

  private TopCollections = Moralis.Object.extend("TopCollections");

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

/*   foo() {
    return of(Moralis.Plugins['opensea'].getOrders({
      network: 'testnet',
      tokenAddress: '0xb74bf94049d2c01f8805b8b15db0909168cabf46',
      tokenId: '240',
      orderSide: '0', // 0 for offers, 1 for auctions
      //page: 1, // pagination shows 20 orders each page
    }));
  } */

  /* ---------------------------------------------------------------------- */

  /* Cloud */

  fetchJSON(url: string) {
    let param = { theUrl: url};
    return from(Moralis.Cloud.run("fetchJSON", param))
  }

  /* ---------------------------------------------------------------------- */

  /* NFT API */

  getAllTokenIds(options: any) {
    return from(Moralis.Web3API.token.getAllTokenIds(options)).pipe(
      map(res => res.result)
    );
  }

  getTokenIdMetadata(options: any) {
    return from(Moralis.Web3API.token.getTokenIdMetadata(options))
  }

  /* ---------------------------------------------------------------------- */

  /* Queries */

  getCollectionsDBbyTag(tag: string): Observable<Moralis.Object<Moralis.Attributes>[]> {
    return from((new Moralis.Query(this.TopCollections)).equalTo("tags", tag).find())  /* containedIn */
  }

  getCollectionsDBbyAddress(address: string): Observable<Moralis.Object<Moralis.Attributes>[]> {
    return from((new Moralis.Query(this.TopCollections)).equalTo("token_address", address).find())  /* containedIn */
  }

  /* ---------------------------------------------------------------------- */

}
