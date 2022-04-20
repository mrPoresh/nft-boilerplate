import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { BasePageComponent } from '../base-components/base-page/base-page.component';
import { DetectDeviceService } from 'src/app/services/utils/detect-device.service';
import { UserInfo } from 'src/app/services/moralis/user-login.models';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent extends BasePageComponent implements OnInit {

  _isVisible: boolean = false;
  childData: any;

  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
  }

  @Input() _isLogged!: UserInfo;

  @Output() closeEvent = new EventEmitter();

  constructor(
    public detectDeviceService: DetectDeviceService
  ) { super() }

  ngOnInit() {
    
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  callLinkClickedParent() {
    this.closeEvent.next("");
  }

}
