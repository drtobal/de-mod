import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameDialogContainerComponent } from './new-game-dialog-container.component';

describe('NewGameDialogContainerComponent', () => {
  let component: NewGameDialogContainerComponent;
  let fixture: ComponentFixture<NewGameDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameDialogContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewGameDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
