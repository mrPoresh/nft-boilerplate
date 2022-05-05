import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasePageComponent } from '../base-page/base-page.component';
import { exploreTrx } from 'src/app/router-translation.labels';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BasePageComponent implements OnInit {

  constructor(
    public router: Router
  ) { super() }

  ngOnInit() {

  }

  exploreCollections() {
    this.router.navigate([exploreTrx]);
  }

}
