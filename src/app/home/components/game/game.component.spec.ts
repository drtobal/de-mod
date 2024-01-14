import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GameComponent } from './game.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DEFAULT_DIFFICULT } from '../../constants';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent, HttpClientTestingModule, NoopAnimationsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if card must be flipped or not', () => {
    component.visibleCards = [1];
    component.cardsCompleted = [4, 5, 6];
    expect(component.isCardVisible(1)).toBeTrue();
    expect(component.isCardVisible(5)).toBeTrue();
    expect(component.isCardVisible(9)).toBeFalse();
  });

  it('should return game over only when all cards are flipped', () => {
    component.cards = [{}, {}] as any; // no type validation here, only logic
    component.cardsCompleted = [];
    component.isGameOver = false;

    component.checkIsGameOver();
    expect(component.isGameOver).toBeFalse();

    component.cardsCompleted = [0, 1];
    component.checkIsGameOver();
    expect(component.isGameOver).toBeTrue();
  });
});
