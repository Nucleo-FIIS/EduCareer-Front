import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test-model';
import { Alerts } from '../models/alerts-model';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  
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

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json;charset=utf-8'
  //   })
  // };
  

  // errorHandl(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     console.log("ShowError 2 " + error.error);
  //     errorMessage = error.error.message;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   errorMessage = error.error.message;
  //   console.log("ShowError " + errorMessage);
  //   return throwError(errorMessage);
  // }
  // constructor(private http: HttpClient) { }

  // realizarTest(test: Test){
  
  //   return this.http.post<Alerts>(this.URL_API, test, this.httpOptions)
  //       .pipe(
  //         retry(0),
  //         catchError(this.errorHandl)
  //       );
  // }
}
