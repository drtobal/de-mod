import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NewGameDialogContainerComponent } from '../new-game-dialog-container/new-game-dialog-container.component';

@Component({
  selector: 'app-new-game-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NewGameDialogContainerComponent],
  templateUrl: './new-game-button.component.html',
  styleUrl: './new-game-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameButtonComponent {
  hasDialog: boolean = false;

  constructor (
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  displayDialog(): void {
    this.hasDialog = true;
  }

  removeDialog(): void {
    this.hasDialog = false;
    this.changeDetectorRef.detectChanges();
  }
}
