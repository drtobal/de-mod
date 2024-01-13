import { AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DEFAULT_USER_NAME } from '../../constants';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { GameOverDialogData } from '../../types';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverComponent implements AfterViewInit {
  @Input() userName: string = DEFAULT_USER_NAME;

  @Input() scoreSuccess: number = 0;

  @Input() scoreError: number = 0;

  constructor(
    readonly matDialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    const data: GameOverDialogData = {
      userName: this.userName,
      scoreError: this.scoreError,
      scoreSuccess: this.scoreSuccess,
    };
    this.matDialog.open(GameOverDialogComponent, { data });
  }
}
