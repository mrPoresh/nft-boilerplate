import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

export enum DEVICE_TYPE {
  MOBILE,
  DESKTOP
}

@Injectable({
  providedIn: 'root'
})
export class DetectDeviceService {

  constructor(private deviceService: DeviceDetectorService) { }

  isDesktop() {
    return this.deviceService.isDesktop()
  }

  foo() {
    return this.deviceService.getDeviceInfo()
  }
  
}
