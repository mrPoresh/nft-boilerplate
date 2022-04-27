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
export const USER_C = new (Moralis.Object.extend("Users_Complited"));

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

  createUserRegisterObj(userForm: FormGroup): Moralis.Object<Moralis.Attributes> {
    let user = USER_R;

    user.set("email", userForm.value.email);
    user.set("password", userForm.value.password);
    user.set("step", 1);

    return user

  }

  createUserObj(userData: Moralis.Object<Moralis.Attributes>): Moralis.Object<Moralis.Attributes> {
    let user = USER_C;
    let staus: boolean = true;

    user.set("email", userData.get("email"));
    user.set("password", userData.get("password"));
    user.set("username", userData.get("username"));
    user.set("ethAddress", userData.get("ethAddress"));
    user.set("ative", staus);

    return user

  }

  setUserData(user: Moralis.Object<Moralis.Attributes>, userForm: FormGroup): Moralis.Object<Moralis.Attributes> {
    user.set("username", userForm.value.username);
    user.set("ethAddress", userForm.value.ethAddress);
    user.set("step", 2);

    return user
  }

/*   setUserActiveData(user: Moralis.Object<Moralis.Attributes>, userForm: FormGroup): Moralis.Object<Moralis.Attributes> {

  } */

  saveUserData(user: Moralis.Object<Moralis.Attributes>): Observable<Moralis.Object<Moralis.Attributes>> {
    return from(user.save({ useMasterKey: true })).pipe(
      catchError(err => { 
        return throwError(() => err);
      })
    );
  }

  deleteUserData(user: Moralis.Object<Moralis.Attributes>): Observable<Moralis.Object<Moralis.Attributes>> {
    return from(user.destroy({ useMasterKey: true })).pipe(
      catchError(err => { 
        return throwError(() => err);
      })
    );
  }

  getUserData(registrationRef: string) {
    return from(new Moralis.Query(USER_R).equalTo('objectId', registrationRef).first()).pipe(
      catchError(err => { 
        return throwError(() => err);
      })
    );
  }

  /* --------------------------------------------------- */

  public requestRegistrationStep(): Observable<RegistrationStepResponse> {
    const registrationRef = this.cookie.get(REGISTRATION_STEP_COOKIE_NAME);
    if (!!registrationRef) {
      return this.getUserData(registrationRef).pipe(
        switchMap(res => {
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
    const user: Moralis.Object<Moralis.Attributes> = this.createUserRegisterObj(userForm);
    return this.saveUserData(user).pipe(
      switchMap(res => {
        this.cookie.set(REGISTRATION_STEP_COOKIE_NAME, res['id']);
        const userResponce: RegisterUserResponse = { registrationStep: res.attributes['step'], userRef: res['id'] };
        return of(userResponce)
      }),
      catchError(err => { 
        return throwError(() => err);
      })
    );
  }

  public postRegistrationStepData(userForm: FormGroup) {
    const registrationRef = this.cookie.get(REGISTRATION_STEP_COOKIE_NAME);
    return this.getUserData(registrationRef).pipe(
      switchMap(res => {
        if (res) {
          res = this.setUserData(res, userForm);
          return this.saveUserData(res).pipe(
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

  }

  public postSaveApplyUser() {
    const registrationRef = this.cookie.get(REGISTRATION_STEP_COOKIE_NAME);
    return this.getUserData(registrationRef).pipe(
      switchMap(res => {
        if (res) {
          const user = this.createUserObj(res);
          this.deleteUserData(res);

          return this.saveUserData(user)

        } else {
          const userResponce: RegistrationStepResponse = { registrationStep: 0 }    /////! re
          return of(userResponce);
        }
      }),
      catchError(err => { 
        return throwError(() => err);
      })
    )
  }

  public completeRegistrationSteps() {
    this.cookie.delete(REGISTRATION_STEP_COOKIE_NAME);
  }

}
