import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasePageComponent } from '../base-page/base-page.component';
import { MoralisMainService } from 'src/app/services/moralis/moralis-main.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent extends BasePageComponent implements OnInit {

  constructor(
    public moralisService: MoralisMainService,
    public router: Router
  ) { 
    super() 
  }

  ngOnInit() {
    /* this.moralisService.foo().then(res => console.log("Loaded ->", res)) */
  }

  exploreCollections() {
    this.router.navigate([this.router.url, 'explore-collections'])
  }

}
