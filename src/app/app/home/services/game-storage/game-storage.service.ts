import { Injectable } from '@angular/core';
import { UtilService } from '../../../app/services/util/util.service';
import { USER_NAME_STORAGE } from '../../constants';
import { Subject } from 'rxjs';
import { GameDifficulty } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  private _newGame = new Subject<GameDifficulty>();

  constructor(
    private utilService: UtilService,
  ) {
    console.log('constructed');
  }

  get newGame(): Subject<GameDifficulty> {
    return this._newGame;
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
