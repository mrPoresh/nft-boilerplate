import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';


import { MoralisMainService, User } from './moralis-main.service';
import { UserInfo, LoggedStatus } from './user-login.models';

@Injectable({
  providedIn: 'root'
})
export class MoralisUserService extends MoralisMainService {

  user?: User;

  private userInfo = new BehaviorSubject<UserInfo>({
    isLogged: LoggedStatus.voidState
  });

  constructor() { super() }

  public getLoginStatus(): Observable<UserInfo> {
    return this.userInfo.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  public updateUserInfo(params: any) {
    let current = this.userInfo.getValue();
    this.userInfo.next({ ...current, ...params });
  }

  requestCheckUserInfo(): Observable<UserInfo> {
    return this.userStatus().pipe(
      switchMap((res) => {
        this.updateUserInfo({
          isLogged: res === true ? LoggedStatus.logged : LoggedStatus.notLogged
        })

        return this.getLoginStatus();
      })
    );
  }

  userStatus() {
    this.user = Moralis.User.current();
    console.log("User ->", this.user);
    if (this.user) {
      return of(true)
    } else {
      return of(false)
    }
  }

}
