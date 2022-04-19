import { Component, OnInit } from '@angular/core';

import { Moralis } from 'moralis';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nft-boilerplate';

  ngOnInit() {
    this.init();
  }

  async init() {
    await Moralis.start({
      appId: environment.moralis.appId,
      serverUrl: environment.moralis.serverUrl,
    });

    console.log("App Id ->", environment.moralis.appId);
    console.log("Server ->", environment.moralis.serverUrl);
  }

}
