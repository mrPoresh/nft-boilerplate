import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BasePageComponentWithDialogs } from '../base-components/base-page/base-page.component';
import { DetectDeviceService } from 'src/app/services/utils/detect-device.service';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';

import { UserInfo } from 'src/app/services/moralis/user-login.models';
import { accountTrx } from 'src/app/router-translation.labels';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class SlideMenuComponent extends BasePageComponentWithDialogs implements OnInit {

  _touchedMain = false;
  _touchedExplore = false;
  _touchedStats = false;
  _touchedResources = false;
  _touchedAccount = false;
  _touchedLogin = false;

  _isVisible = false;
  childData: any;

  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
  }
  @Input() _isLogged!: UserInfo;
  @Output() closeEvent = new EventEmitter();

  constructor(
    public detectDeviceService: DetectDeviceService,
    public moralisService: MoralisUserService,
    public router: Router,
    public errorDialog: MatDialog,
  ) { super(errorDialog) }

  ngOnInit() {
    
  }

  /* --------------------------------------------------------- */

  get isVisible(): boolean {
    return this._isVisible;
  }

  callLinkClickedParent() {
    this.closeEvent.next("");
  }

  /* --------------------------------------------------------- */

  /* <- TODO + slide button -> */

  touchedMain() {
    if (this._touchedMain) this._touchedMain = false;
    else this._touchedMain = true;
  }

  touchedExplore() {
    if (this._touchedExplore) this._touchedExplore = false;
    else this._touchedExplore = true;
  }

  touchedStats() {
    if (this._touchedStats) this._touchedStats = false;
    else this._touchedStats = true;
  }

  touchedResources() {
    if (this._touchedResources) this._touchedResources = false;
    else this._touchedResources = true;
  }

  touchedAccount() {
    if (this._touchedAccount) this._touchedAccount = false;
    else this._touchedAccount = true;
  }

  touchedLogin() {
    if (this._touchedLogin) this._touchedLogin = false;
    else this._touchedLogin = true;
  }

  /* --------------------------------------------------------- */

  accountNavigate() {
    this.router.navigate([this.router.url, accountTrx]);
    this.callLinkClickedParent();
  }

  /* --------------------------------------------------------- */

  connectMetamask() {
     this.moralisService.userLoginWithMetamask().subscribe({
      next: () => {
        this.openSuccessDialog("MetaMask was successfully connected", "Success");
        this.callLinkClickedParent();
      },
      error: (err) => {
        console.log("User Error ->", err);
        this.openErrorDialog("MetaMask was successfully denied", "Error");
        this.callLinkClickedParent();
      },
    });
  }

  logOut() {
    this.moralisService.userLogOut();
    this.callLinkClickedParent();
  }

  /* --------------------------------------------------------- */

}
