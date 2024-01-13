import { TestBed } from '@angular/core/testing';

import { GameApiService } from './game-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameApiService', () => {
  let service: GameApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GameApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should duplicate the array', () => {
    expect(service.duplicate([1, 2, 3])).toEqual([1, 1, 2, 2, 3, 3]);
  });

  it('should resort array', () => {
    const shuffle = service.suffle([1, 2, 3]);
    expect(shuffle).toContain(1);
    expect(shuffle).toContain(2);
    expect(shuffle).toContain(3);
  });
});
