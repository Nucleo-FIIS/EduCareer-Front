import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    URL_API: string = 'http://localhost:8080/';
    AUTH_COOKIE_NAME: string = 'auth_token';
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' }) };
    constructor(private httpClient: HttpClient) {

    }
    errorHandl(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
    register(request: any): Observable<any> {
        return this.httpClient.post<any>(this.URL_API + 'api/users/register', request, this.httpOptions).pipe(
            retry(1),
            catchError(this.errorHandl),
            map(response => response.token)
        );
    }
    login(request: any): Observable<any> {
        return this.httpClient.post<any>(this.URL_API + 'api/users/login', request, this.httpOptions).pipe(
            retry(1),
            catchError(this.errorHandl),
            map(response => response.token)
        );
    }
}