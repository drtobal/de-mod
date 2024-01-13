import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { GameOverDialogData } from '../../types';

@Component({
  selector: 'app-game-over-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './game-over-dialog.component.html',
  styleUrl: './game-over-dialog.component.scss'
})
export class GameOverDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: GameOverDialogData,
  ) { }
}
