import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-new-game-dialog-container',
  standalone: true,
  imports: [NewGameDialogComponent],
  templateUrl: './new-game-dialog-container.component.html',
  styleUrl: './new-game-dialog-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogContainerComponent implements AfterViewInit {
  @Output() dialogDisplayed = new EventEmitter();

  constructor(
    readonly matDialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    this.matDialog.open(NewGameDialogComponent).afterOpened().subscribe(() => this.dialogDisplayed.emit());
  }
}
