import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { takeUntil } from 'rxjs/operators';

import { BasePageComponent } from './components/base-components/base-page/base-page.component';
import { topMenuAction } from './components/slide-menu/slide-menu-button/slide-menu-button.component';
import { DetectDeviceService } from './services/utils/detect-device.service'
import { MoralisUserService } from './services/moralis/moralis-user.service';
import { UserInfo, LoggedStatus } from './services/moralis/user-login.models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BasePageComponent implements AfterViewInit {
  title = 'nft-boilerplate';

  isOpened: boolean = false;
  isLogged: UserInfo = { isLogged: -1 }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public detectDeviceService: DetectDeviceService,
    public moralisService: MoralisUserService
  ) { super() }

  ngOnInit() {
    this.moralisService.init().then(() => 
      this.moralisService.requestCheckUserInfo().pipe(takeUntil(this.unsubscribe)).subscribe(
        res => {this.isLogged = res; console.log("isLogged ->", this.isLogged);}
      )
    ).then(() => 
      this.moralisService.foo().pipe(takeUntil(this.unsubscribe)).subscribe(
        res => console.log("Responce ->", res)
      ));
  }

  ngAfterViewInit() {
    if (!!this.sidenav) {
      this.sidenav.openedStart.pipe(takeUntil(this.unsubscribe)).subscribe(() =>
        this.isOpened = true
      )
      this.sidenav.closedStart.pipe(takeUntil(this.unsubscribe)).subscribe(() =>
        this.isOpened = false
      )
    }
  }

  topClicked(value: topMenuAction) {
    if (value === topMenuAction.TOP) {
      this.sidenav.open();
    }
    else if (value === topMenuAction.BACK) {
      this.sidenav.close();
    }
  }

  close() {
    this.sidenav.close();
  }

}
