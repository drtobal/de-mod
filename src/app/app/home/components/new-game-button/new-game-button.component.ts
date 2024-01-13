import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NewGameDialogContainerComponent } from '../new-game-dialog-container/new-game-dialog-container.component';

/** displays a button to starts a new game, and load the dialog only when user interacts with it */
@Component({
  selector: 'app-new-game-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NewGameDialogContainerComponent],
  templateUrl: './new-game-button.component.html',
  styleUrl: './new-game-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameButtonComponent {
  /** check if it is displaying the dialog */
  hasDialog: boolean = false;

  /** component constructor */
  constructor (
    private changeDetectorRef: ChangeDetectorRef,
  ) { /* do nothing */ }

  /** load the component to display the dialog */
  displayDialog(): void {
    this.hasDialog = true;
  }

  /** remove the component in order to display the next dialog */
  removeDialog(): void {
    this.hasDialog = false;
    this.changeDetectorRef.detectChanges();
  }
}
