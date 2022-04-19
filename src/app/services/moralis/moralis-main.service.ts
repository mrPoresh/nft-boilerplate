import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { from, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

export type User = Moralis.User<Moralis.Attributes>;

@Injectable({
  providedIn: 'root'
})
export class MoralisMainService {

  user?: User;

  constructor() { }
  

  async init() {
    await Moralis.start({
      appId: environment.moralis.appId,
      serverUrl: environment.moralis.serverUrl,
    });

    console.log("App Id ->", environment.moralis.appId);
    console.log("Server ->", environment.moralis.serverUrl);
  }

  /* ---------------- User Login + Login Status ----------------- */

  userStatus() {
    this.user = Moralis.User.current();
    console.log("User status ->", this.user?.attributes);
    if (this.user) {
      return of(true)
    } else {
      return of(false)
    }
  }

  private setLoggedInUser(loggedInUser?: User) {
    this.user = loggedInUser;

    if (this.user) {
      console.log("User Atr ->", this.user.attributes);
    }
    
    return this.user

  }

  userLoginWithMetamask() {
    return from(Moralis.authenticate()).pipe(
      map(res => this.setLoggedInUser(res)),
      catchError(err => { 
        return throwError(() => err);
      })
    );
  }

  userLogOut() {
    Moralis.User.logOut();
    this.setLoggedInUser(undefined);
  }

  /* ---------------------------------------------------------- */

}
