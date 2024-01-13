import { Injectable } from '@angular/core';
import { UtilService } from '../../../app/services/util/util.service';
import { HIGHSCORES_STORAGE, MAX_HIGHSCORES, USER_NAME_STORAGE } from '../../constants';
import { Subject } from 'rxjs';
import { GameDifficulty, HighScore } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  private _newGame = new Subject<GameDifficulty>();

  constructor(
    private utilService: UtilService,
  ) { }

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

  saveHighScore(score: HighScore): void {
    if (this.utilService.hasWindow()) {
      let scores = this.getHighScores();
      if (scores.find(s => s.score < score.score)) { //only save if it is higher
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
