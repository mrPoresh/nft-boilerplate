import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuBackService {

  private _showBack = new BehaviorSubject<boolean>(false);

  constructor() { }

  showBack() {
    this._showBack.next(true);
  }

  hideBack() {
    this._showBack.next(false);
  }

  attach(): Observable<boolean> {
    return this._showBack.asObservable();
  }
  
}