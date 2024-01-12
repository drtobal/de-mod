import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DEFAULT_USER_NAME } from '../../constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverComponent {
  @Input() userName: string = DEFAULT_USER_NAME;

  @Input() scoreSuccess: number = 0;

  @Input() scoreError: number = 0;
}
