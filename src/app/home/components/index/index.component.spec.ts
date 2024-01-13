import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the user name and emit to service', () => {
    component.userName = '';
    component['gameStorageService'].saveUserName = jasmine.createSpy();
    component.onUserName('demo');
    expect(component.userName).toBe('demo');
    expect(component['gameStorageService'].saveUserName).toHaveBeenCalledOnceWith('demo');
  });
});
