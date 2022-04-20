import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';

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

    console.log("App Id ->", environment.moralis.appId);
    console.log("Server ->", environment.moralis.serverUrl);
  }

}
