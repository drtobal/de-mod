import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GAME_DIFFICULTIES } from '../../constants';
import { GameDifficulty } from '../../types';

@Component({
  selector: 'app-new-game-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './new-game-dialog.component.html',
  styleUrl: './new-game-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogComponent {
  gameDifficulties = GAME_DIFFICULTIES;

  constructor(
    private matDialogRef: MatDialogRef<NewGameDialogComponent>,
  ) { }

  newGame(difficult: GameDifficulty): void {
    this.matDialogRef.close(difficult);
  }
}
