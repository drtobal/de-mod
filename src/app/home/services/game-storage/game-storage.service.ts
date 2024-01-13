import { Injectable } from '@angular/core';
import { UtilService } from '../../../app/services/util/util.service';
import { HIGHSCORES_STORAGE, MAX_HIGHSCORES, USER_NAME_STORAGE } from '../../constants';
import { Subject } from 'rxjs';
import { GameDifficulty, HighScore } from '../../types';

/** this service is to interact with saved data, is a singleton provided to the application */
@Injectable({
  providedIn: 'root'
})
export class GameStorageService {
  /** use this subject to start a new game */
  private _newGame = new Subject<GameDifficulty>();

  /** service constructor */
  constructor(
    private utilService: UtilService,
  ) { /* do nothing */ }

  /** get the new game subject */
  get newGame(): Subject<GameDifficulty> {
    return this._newGame;
  }

  /** retrieve the user name from localstorage */
  getUserName(): string | null {
    if (this.utilService.hasWindow()) {
      return window.localStorage.getItem(USER_NAME_STORAGE);
    }
    return null;
  }

  /** save the current user name to the localstorage */
  saveUserName(name: string): void {
    if (this.utilService.hasWindow()) {
      window.localStorage.setItem(USER_NAME_STORAGE, name);
    }
  }

  /** get the list of high scores */
  getHighScores(): HighScore[] {
    if (this.utilService.hasWindow()) {
      try {
        let data = window.localStorage.getItem(HIGHSCORES_STORAGE);
        if (data) {
          data = JSON.parse(data);
          if (Array.isArray(data)) {
            return data;
          }
        }
      } catch (e) {
        window.localStorage.removeItem(HIGHSCORES_STORAGE); // corrupted data
      }
    }
    return [];
  }

  /** save a new high score */
  saveHighScore(score: HighScore): void {
    if (this.utilService.hasWindow()) {
      let scores = this.getHighScores();
      if (scores.find(s => s.score < score.score) || scores.length <= MAX_HIGHSCORES) { //only save if it is higher
        scores.push(score);
        scores = scores.slice(-MAX_HIGHSCORES);
        scores = scores.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          }
          if (a.score > b.score) {
            return -1;
          }
          return 0;
        });
        window.localStorage.setItem(HIGHSCORES_STORAGE, JSON.stringify(scores));
      }
    }
  }
}
