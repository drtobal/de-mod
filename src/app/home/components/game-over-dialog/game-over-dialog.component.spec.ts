import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverDialogComponent } from './game-over-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { GAME_DIFFICULTIES } from '../../constants';

describe('GameOverDialogComponent', () => {
  let component: GameOverDialogComponent;
  let fixture: ComponentFixture<GameOverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverDialogComponent, MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            userName: '',
            scoreSucces: 0,
            scoreError: 0,
            difficulty: GAME_DIFFICULTIES[0],
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameOverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
