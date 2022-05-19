import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';
import { MoralisNftService } from 'src/app/services/moralis/moralis-nft.service';

@Component({
  selector: 'app-explore-collections',
  templateUrl: './explore-collections.component.html',
  styleUrls: ['./explore-collections.component.scss']
})
export class ExploreCollectionsComponent extends BasePageComponent implements OnInit {

  public tags = ['trending', 'top', 'art'];
  public collections: any[] = [];

  constructor(
    public moralisService: MoralisNftService,
    public router: Router
  ) { super() }

  ngOnInit() {
    this.moralisService.getCollectionsByTags(this.tags).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.collections = res;
      console.log("Explore Collections Data ->", this.collections);
    })
  }

  chooseCollection(collection: any) {
    /* this.moralisService.changeChoosedObject(collection); */
    this.router.navigate(['collection' + '/' + collection.collectionName.replace(/\s/g, "") + '/' + collection.token_address]);
    console.log("Selected ->", collection);
  }

}
