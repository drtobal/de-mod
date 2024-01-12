import { Injectable } from '@angular/core';
import { UtilService } from '../../../app/services/util/util.service';
import { USER_NAME_STORAGE } from '../../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  private _userName = new BehaviorSubject<string>('');

  private _errorScore = new BehaviorSubject<number>(0);

  private _successScore = new BehaviorSubject<number>(0);

  constructor(
    private utilService: UtilService,
  ) { /* do nothing */ }

  get userName(): BehaviorSubject<string> {
    return this._userName;
  }

  get errorScore(): BehaviorSubject<number> {
    return this._errorScore;
  }

  get successScore(): BehaviorSubject<number> {
    return this._successScore;
  }

  getUserName(): string | null {
    if (this.utilService.hasWindow()) {
      return window.localStorage.getItem(USER_NAME_STORAGE);
    }
    return null;
  }

  saveUserName(name: string): void {
    if (this.utilService.hasWindow()) {
      window.localStorage.setItem(USER_NAME_STORAGE, name);
    }
  }
}
