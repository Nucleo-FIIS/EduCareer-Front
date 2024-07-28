import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {

  constructor() { }

  private searchResultsSubject = new BehaviorSubject<{source: string, data: any} | null>(null);
  private searchErrorSubject = new BehaviorSubject<{source: string, error: string} | null>(null);

  setSearchResults(source: string, results: any): void {
    this.searchResultsSubject.next({source, data: results});
    this.searchErrorSubject.next(null); // Clear any previous error
  }

  setSearchError(source: string, error: string): void {
    this.searchErrorSubject.next({source, error});
    this.searchResultsSubject.next(null); // Clear any previous results
  }

  getSearchResults(): Observable<{source: string, data: any} | null> {
    return this.searchResultsSubject.asObservable();
  }

  getSearchError(): Observable<{source: string, error: string} | null> {
    return this.searchErrorSubject.asObservable();
  }
}
