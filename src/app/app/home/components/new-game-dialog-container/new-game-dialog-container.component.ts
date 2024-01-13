import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { GameStorageService } from '../../services/game-storage/game-storage.service';

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
    private gameStorageService: GameStorageService,
    readonly matDialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    const dialog = this.matDialog.open(NewGameDialogComponent);
    dialog.afterOpened().subscribe(() => this.dialogDisplayed.emit());
    dialog.afterClosed().subscribe(result => {
      if (result) {
        // console.log({ result });
        this.gameStorageService.newGame.next(result);
      }
    });
  }
}
