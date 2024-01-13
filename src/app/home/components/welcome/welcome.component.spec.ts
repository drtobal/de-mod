import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the name change only when form is valid', () => {
    component.onUserName.emit = jasmine.createSpy();
    component.form.controls.userName.patchValue(null); // invalid value
    component.submit();
    expect(component.onUserName.emit).not.toHaveBeenCalled();
    
    component.form.controls.userName.patchValue('guest');
    component.submit();
    expect(component.onUserName.emit).toHaveBeenCalled();
  });

  it('should mark form as touched', () => {
    component.form.markAllAsTouched = jasmine.createSpy();
    component.inputBlur();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
  });
});
