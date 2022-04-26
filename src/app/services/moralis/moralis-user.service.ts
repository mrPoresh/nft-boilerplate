import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { Observable, BehaviorSubject, of, from, throwError, map } from 'rxjs';
import { distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup } from '@angular/forms';

import { MoralisMainService, User } from './moralis-main.service';
import { UserInfo, LoggedStatus } from './user-login.models';
import { RegistrationStepResponse, RegisterUserResponse } from './registration.models';

export const REGISTRATION_STEP_COOKIE_NAME: string = "regref"

export const USER_R = new (Moralis.Object.extend("Users_Registration"));

@Injectable({
  providedIn: 'root'
})
export class MoralisUserService extends MoralisMainService {

  user?: User;

  private userInfo = new BehaviorSubject<UserInfo>({
    isLogged: LoggedStatus.voidState
  });

  constructor(
    public cookie: CookieService,
  ) { super() }

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

  /* --------------------------------------------------- */
  userLoginWithMetamask() {
    return from(Moralis.authenticate()).pipe(
      switchMap(() => {
        this.updateUserInfo({
          isLogged: LoggedStatus.logged
        })

        return this.getLoginStatus();
      }),
      catchError(err => { 
        return throwError(() => err);
      })
    );
  }

  userLogOut() {
    Moralis.User.logOut();
    this.updateUserInfo({
      isLogged: LoggedStatus.notLogged
    });
  }

  /* --------------------------------------------------- */

  createUserObj(userForm: FormGroup) {
    let user = USER_R;

    user.set("email", userForm.value.email);
    user.set("password", userForm.value.password);
    user.set("step", 1);

    return user

  }

  setUserData(userForm: FormGroup) {

  }

  /* --------------------------------------------------- */

  public requestRegistrationStep()/* : Observable<RegistrationStepResponse> */ {
    const registrationRef = this.cookie.get(REGISTRATION_STEP_COOKIE_NAME);
    if (!!registrationRef) {
      const query = (new Moralis.Query(USER_R)).equalTo('objectId', registrationRef);
      return from(query.first()).pipe(
        switchMap(res => {
          console.log("Get Step ->", res);
          const userStepResponce: RegistrationStepResponse = { registrationStep: res?.attributes['step'] };
          return of(userStepResponce);
        })
      );
    } else {
      const firstStep: RegistrationStepResponse = { registrationStep: 0 }
      return of(firstStep);
    }
  }

  public postRegistrationStepAddUser(userForm: FormGroup): Observable<RegisterUserResponse> {
    const user: Moralis.Object<Moralis.Attributes> = this.createUserObj(userForm);
    return from(user.save()).pipe(
      switchMap(res => {
        this.cookie.set(REGISTRATION_STEP_COOKIE_NAME, res['id']);
        console.log("Moralis User Res ->", res);
        const userResponce: RegisterUserResponse = { registrationStep: res.attributes['step'], userRef: res['id'] };
        return of(userResponce)
      }),
      catchError(err => { 
        return throwError(() => err);
      })
    );
  }

  public postRegistrationStepData(userForm: FormGroup) {
    const avatar = new Moralis.File(userForm.value.avatarName, {base64: userForm.value.avatarFile});
    const registrationRef = this.cookie.get(REGISTRATION_STEP_COOKIE_NAME);
    if (!!registrationRef) {
      const query = (new Moralis.Query(USER_R)).equalTo('objectId', registrationRef);
      return from(query.first()).pipe(
        switchMap(res => {
          if (res) {
            res.set("avatar", avatar);
            console.log(avatar);
            res.set("username", userForm.value.username);
            res.set("ethAddress", userForm.value.ethAddress);
            res.set("step", 2);
            return from(res.save()).pipe(
              switchMap(res => {
                const userResponce: RegisterUserResponse = { registrationStep: res.attributes['step'], userRef: res['id'] };
                return of(userResponce)
              }),
              catchError(err => { 
                return throwError(() => err);
              })
            )
          } else {
            const userResponce: RegistrationStepResponse = { registrationStep: 0 }
            return of(userResponce);
          }
        }),
        catchError(err => { 
          return throwError(() => err);
        })
      );
    } else {
      const userResponce: RegistrationStepResponse = { registrationStep: 0 }
      return of(userResponce);
    }

  }

}
