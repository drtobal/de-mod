import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';

/**
 * this is a container to display the new game dialog, this is a bridge to defer the source code of the dialog
 * the dialog is displayed afterviewinit event so be careful
 * */
@Component({
  selector: 'app-new-game-dialog-container',
  standalone: true,
  imports: [NewGameDialogComponent],
  templateUrl: './new-game-dialog-container.component.html',
  styleUrl: './new-game-dialog-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogContainerComponent implements AfterViewInit {
  /** tells the parent when the dialog is already displayed */
  @Output() dialogDisplayed = new EventEmitter();

  /** component constructor */
  constructor(
    readonly matDialog: MatDialog,
  ) { /* do nothing */ }

  /** opens the dialog */
  ngAfterViewInit(): void {
    this.matDialog.open(NewGameDialogComponent).afterOpened().subscribe(() => this.dialogDisplayed.emit());
  }
}
