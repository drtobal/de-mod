import { CommonModule } from '@angular/common';
import { EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { GameApiService } from '../../services/game-api/game-api.service';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Input } from '@angular/core';
import { DEFAULT_DIFFICULT, DEFAULT_USER_NAME, GAME_DIFFICULTIES } from '../../constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Card, GameDifficulty } from '../../types';
import { CardComponent } from '../card/card.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { NewGameButtonComponent } from '../new-game-button/new-game-button.component';
import { GameStorageService } from '../../services/game-storage/game-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent, GameOverComponent, NewGameButtonComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, OnDestroy {
  @Input() userName: string = DEFAULT_USER_NAME;

  @Output() resetName = new EventEmitter();

  loading: boolean = true;

  scoreSuccess: number = 0;

  scoreError: number = 0;

  httpError: HttpErrorResponse | null = null;

  cards: Card[] = [];

  visibleCards: number[] = [];

  cardsCompleted: number[] = [];

  isGameOver: boolean = false;

  difficulty: GameDifficulty = DEFAULT_DIFFICULT;

  newGameSub?: Subscription;

  constructor(
    private gameStorageService: GameStorageService,
    private gameApiService: GameApiService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadCards();
    this.newGameSub = this.gameStorageService.newGame.subscribe(this.loadCards.bind(this));
  }

  ngOnDestroy(): void {
    this.newGameSub?.unsubscribe();
  }

  loadCards(difficulty: GameDifficulty = DEFAULT_DIFFICULT): void {
    this.resetGame();
    this.loading = true;
    this.difficulty = difficulty;
    this.changeDetectorRef.detectChanges();
    this.gameApiService.getCards(difficulty).subscribe({
      next: data => this.cards = this.gameApiService.generateCardsGame(data.entries),
      error: error => this.httpError = error,
    }).add(() => {
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  resetGame(): void {
    this.isGameOver = false;
    this.scoreSuccess = 0;
    this.scoreError = 0;
    this.visibleCards = [];
    this.cardsCompleted = [];
    this.httpError = null;
  }

  isCardVisible(index: number): boolean {
    return this.visibleCards.indexOf(index) > -1 || this.cardsCompleted.indexOf(index) > -1;
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

  getDifficultyLabel(difficulty: GameDifficulty): string {
    const definition = GAME_DIFFICULTIES.find(f => f.key == difficulty);
    return definition ? definition.label : DEFAULT_DIFFICULT;
  }
}
