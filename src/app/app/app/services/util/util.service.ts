import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  hasWindow(): boolean {
    return (typeof window !== 'undefined'); // SSR mode does not have window object
  }
}
