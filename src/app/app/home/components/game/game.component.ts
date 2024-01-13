import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GameApiService } from '../../services/game-api/game-api.service';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Input } from '@angular/core';
import { DEFAULT_USER_NAME } from '../../constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Card } from '../../types';
import { CardComponent } from '../card/card.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { TRANSITION_ENTER } from '../../../app/constants';

const ANIMATION_FADE_IN = style({ opacity: 0 });

const ANIMATION_FADE_OUT = style({ opacity: 1 });

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent, GameOverComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [ANIMATION_FADE_IN, animate(TRANSITION_ENTER, ANIMATION_FADE_OUT)]),
    ]),
  ],
})
export class GameComponent implements OnInit {
  @Input() userName: string = DEFAULT_USER_NAME;

  loading: boolean = true;

  scoreSuccess: number = 0;

  scoreError: number = 0;

  httpError: HttpErrorResponse | null = null;

  cards: Card[] = [];

  visibleCards: number[] = [];

  cardsCompleted: number[] = [];

  isGameOver: boolean = false;

  constructor(
    private gameApiService: GameApiService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadCards();
    setTimeout(() => {
      this.isGameOver = true;
      this.changeDetectorRef.detectChanges();
    }, 3000);
  }

  loadCards(): void {
    this.loading = true;
    this.httpError = null;
    this.changeDetectorRef.detectChanges();
    this.gameApiService.getCards().subscribe({
      next: data => this.cards = this.gameApiService.generateCardsGame(data.entries),
      error: error => this.httpError = error,
    }).add(() => {
      this.loading = false;
      console.log(JSON.stringify(this.cards));
      this.changeDetectorRef.detectChanges();
    });
  }

  isCardVisible(index: number): boolean {
    // return this.visibleCards.indexOf(index) > -1 || this.cardsCompleted.indexOf(index) > -1;
    return true;
  }

  showCard(index: number): void {
    if (this.visibleCards.indexOf(index) === -1 && this.cardsCompleted.indexOf(index) === -1) {
      if (this.visibleCards.length >= 2) {
        this.visibleCards = [index];
      } else {
        this.visibleCards.push(index);
        this.checkIsPair();
      }
    }
  }

  checkIsPair(): void {
    if (this.visibleCards.length === 2) {
      const cardA = this.cards[this.visibleCards[0]];
      const cardB = this.cards[this.visibleCards[1]];
      if (cardA.meta.uuid === cardB.meta.uuid) {
        this.cardsCompleted.push(this.visibleCards[0]);
        this.cardsCompleted.push(this.visibleCards[1]);
        this.visibleCards = [];
        this.scoreSuccess++;
        this.checkIsGameOver();
      } else {
        this.scoreError++;
      }
    }
  }

  checkIsGameOver(): void {
    this.isGameOver = this.cardsCompleted.length === this.cards.length;
  }
}
