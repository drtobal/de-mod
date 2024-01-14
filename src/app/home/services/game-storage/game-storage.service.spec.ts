import { TestBed } from '@angular/core/testing';

import { GameStorageService } from './game-storage.service';

describe('GameStorageService', () => {
  let service: GameStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add highscore to array in order', () => {
    //add only
    expect(service.addHighScore([], { name: '', score: 0 })).toEqual([{ name: '', score: 0 }]);

    // add second, same score
    expect(service.addHighScore([{ name: 'a', score: 0 }], { name: 'b', score: 0 }))
      .toEqual([{ name: 'a', score: 0 }, { name: 'b', score: 0 }]);

    // add second
    expect(service.addHighScore([{ name: 'a', score: -10 }], { name: 'b', score: -20 }))
      .toEqual([{ name: 'a', score: -10 }, { name: 'b', score: -20 }]);

    // add first
    expect(service.addHighScore([{ name: 'a', score: -10 }], { name: 'b', score: 20 }))
      .toEqual([{ name: 'b', score: 20 }, { name: 'a', score: -10 }]);

    // list full, cant add
    expect(service.addHighScore([
      { name: 'a', score: -10 },
      { name: 'b', score: -10 },
      { name: 'c', score: -10 },
    ], { name: 'd', score: -20 }, 3))
      .toEqual([
        { name: 'a', score: -10 },
        { name: 'b', score: -10 },
        { name: 'c', score: -10 },
      ]);

    // list full, add 2nd place
    expect(service.addHighScore([
      { name: 'a', score: 40 },
      { name: 'b', score: 30 },
      { name: 'c', score: 20 },
    ], { name: 'd', score: 35 }, 3))
      .toEqual([
        { name: 'a', score: 40 },
        { name: 'd', score: 35 },
        { name: 'b', score: 30 },
      ]);

    // list full, add first place
    expect(service.addHighScore([
      { name: 'a', score: 40 },
      { name: 'b', score: 30 },
      { name: 'c', score: 20 },
    ], { name: 'd', score: 80 }, 3))
      .toEqual([
        { name: 'd', score: 80 },
        { name: 'a', score: 40 },
        { name: 'b', score: 30 },
      ]);
  });
});