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
});
