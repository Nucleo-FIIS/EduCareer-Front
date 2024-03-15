import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Test } from '../models/test-model';
import { Alerts } from '../models/alerts-model';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private toastSubject = new Subject<Alerts>();

  constructor(private httpClient: HttpClient) { }

  URL_API: string = 'http://localhost:8080/api/test';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  };


  realizarTest(test: Test): Observable<Alerts> {
    return this.httpClient.post<Alerts>(this.URL_API, test, this.httpOptions);
  }

  // Método para enviar un nuevo toast
  sendToast(toast: Alerts) {
    this.toastSubject.next(toast);
  }

  // Método para suscribirse a los toasts
  getToasts() {
    return this.toastSubject.asObservable();
  }
}
