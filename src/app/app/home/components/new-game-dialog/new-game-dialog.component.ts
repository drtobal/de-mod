import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { GAME_DIFFICULTIES } from '../../constants';
import { GameDifficulty } from '../../types';
import { GameStorageService } from '../../services/game-storage/game-storage.service';

/** display a material dialog with buttons to choose the difficulty for a new game */
@Component({
  selector: 'app-new-game-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './new-game-dialog.component.html',
  styleUrl: './new-game-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogComponent {
  /** list of available game difficulties */
  gameDifficulties = GAME_DIFFICULTIES;

  /** component constructor */
  constructor(
    private gameStorageService: GameStorageService,
  ) { /* do nothing */ }

  /** starts a new game */
  newGame(difficult: GameDifficulty): void {
    this.gameStorageService.newGame.next(difficult);
  }
}
