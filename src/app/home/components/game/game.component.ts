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
import { LoadingComponent } from '../loading/loading.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { TRANSITION_ENTER, TRANSITION_EXIT_PERMANENT } from '../../../app/constants';

const FADE_IN = style({ opacity: 0 });

const FADE_OUT = style({ opacity: 1 });

/** this component orchestrates all component games in a imperative way, loading screen currently playing game */
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardComponent, GameOverComponent, NewGameButtonComponent, LoadingComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [FADE_IN, animate(TRANSITION_ENTER, FADE_OUT)]),
      transition(':leave', [FADE_OUT, animate(TRANSITION_EXIT_PERMANENT, FADE_IN)]),
    ]),
  ],
})
export class GameComponent implements OnInit, OnDestroy {
  /** current user playing */
  @Input() userName: string = DEFAULT_USER_NAME;

  /** hability to reset the name of the playing user */
  @Output() resetName = new EventEmitter();

  /** flag for loading state while cards are getting from server */
  loading: boolean = true;

  /** current game score */
  scoreSuccess: number = 0;

  /**current game score */
  scoreError: number = 0;

  /** store the http error of retrieving cards */
  httpError: HttpErrorResponse | null = null;

  /** array of the cards displayed in the game */
  cards: Card[] = [];

  /** currently visible cards, 2 max */
  visibleCards: number[] = [];

  /** cards that already with their paris */
  cardsCompleted: number[] = [];

  /** flag to check if the game is already finished */
  isGameOver: boolean = false;

  /** currently difficult of the game */
  difficulty: GameDifficulty = DEFAULT_DIFFICULT;

  /** subscription to know where to start a new game */
  newGameSub?: Subscription;

  /** component constructor */
  constructor(
    private gameStorageService: GameStorageService,
    private gameApiService: GameApiService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { /* do nothing*/ }

  /** start the game and set up */
  ngOnInit(): void {
    this.loadCards();
    this.newGameSub = this.gameStorageService.newGame.subscribe(this.loadCards.bind(this));
  }

  /** clean up */
  ngOnDestroy(): void {
    this.newGameSub?.unsubscribe();
  }

  /** load cards from server */
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

  /** reset all variables to start a new game */
  resetGame(): void {
    this.isGameOver = false;
    this.scoreSuccess = 0;
    this.scoreError = 0;
    this.visibleCards = [];
    this.cardsCompleted = [];
    this.httpError = null;
  }

  /** check if this card is folded up */
  isCardVisible(index: number): boolean {
    return this.visibleCards.indexOf(index) > -1 || this.cardsCompleted.indexOf(index) > -1;
  }

  /** display a requested card if it can */
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

  /** check if currently are two cards of the same type beign visible */
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

  /** check if the game should end */
  checkIsGameOver(): void {
    this.isGameOver = this.cardsCompleted.length === this.cards.length;
    if (this.isGameOver) {
      this.gameStorageService.saveHighScore({
        name: this.userName,
        score: this.scoreSuccess - this.scoreError,
      });
    }
  }

  /** displays the current difficult label */
  getDifficultyLabel(difficulty: GameDifficulty): string {
    const definition = GAME_DIFFICULTIES.find(f => f.key == difficulty);
    return definition ? definition.label : DEFAULT_DIFFICULT;
  }
}
