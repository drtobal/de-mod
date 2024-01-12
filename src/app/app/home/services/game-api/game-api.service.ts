import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, CardApiResponse } from '../../types';
import { Observable } from 'rxjs';
import { API_CARDS } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  /** service constructor */
  constructor(
    private http: HttpClient,
  ) { /* do nothing */ }

  getCards(): Observable<CardApiResponse> {
    return this.http.get<CardApiResponse>(API_CARDS);
  }

  generateCardsGame(cards: Card[]): Card[] {
    return this.suffle(this.duplicate(cards));
  }

  duplicate<T>(items: T[]): T[] {
    // be careful, this generates duplicates uuid
    return items.reduce((res: T[], current: T) => res.concat([current, current]), []);
  }

  // modern version of the Fisher–Yates shuffle
  suffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

}
