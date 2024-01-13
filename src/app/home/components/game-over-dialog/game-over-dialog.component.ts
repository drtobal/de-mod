import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { GameOverDialogData, HighScore } from '../../types';
import { NewGameButtonComponent } from '../new-game-button/new-game-button.component';
import { GameStorageService } from '../../services/game-storage/game-storage.service';

/** material dialog with game over information */
@Component({
  selector: 'app-game-over-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NewGameButtonComponent],
  templateUrl: './game-over-dialog.component.html',
  styleUrl: './game-over-dialog.component.scss'
})
export class GameOverDialogComponent {
  /** list of past high scores */
  highScores: HighScore[] = [];

  /** component constructor */
  constructor(
    private gameStorageService: GameStorageService,
    @Inject(MAT_DIALOG_DATA) readonly data: GameOverDialogData,
  ) {
    this.highScores = this.gameStorageService.getHighScores();
  }
}
