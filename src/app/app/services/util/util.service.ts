import { Injectable } from '@angular/core';

/** just util functions to use in the application */
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  /** check if client has window object */
  hasWindow(): boolean {
    return (typeof window !== 'undefined'); // SSR mode does not have window object
  }
}
