import { AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DEFAULT_USER_NAME } from '../../constants';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { GameOverDialogData } from '../../types';

/** used to defer load of the game over dialog and mat dialog styles and source code */
@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverComponent implements AfterViewInit {
  /** current user name playing */
  @Input() userName: string = DEFAULT_USER_NAME;

  /** score of the current game */
  @Input() scoreSuccess: number = 0;

  /** score of the current game */
  @Input() scoreError: number = 0;

  /** component constructor */
  constructor(
    readonly matDialog: MatDialog,
  ) { /* do nothing */ }

  /** displays the game over dialog */
  ngAfterViewInit(): void {
    const data: GameOverDialogData = {
      userName: this.userName,
      scoreError: this.scoreError,
      scoreSuccess: this.scoreSuccess,
    };
    this.matDialog.open(GameOverDialogComponent, { data });
  }
}
