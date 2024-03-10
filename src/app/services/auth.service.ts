import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    URL_API: string = 'http://localhost:8080/';
    AUTH_COOKIE_NAME: string = 'auth_token';
    httpOptions = { headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    constructor(private httpClient: HttpClient) {

    }
    handleError(error: HttpErrorResponse): Observable<any> {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            if (error.status === 0) {
                errorMessage = 'Error al conectar con el servidor';
            } else {
                errorMessage = error.error.message;
            }
        }
        return throwError(() => new Error(errorMessage));
    }
    register(request: any): Observable<any> {
        return this.httpClient.post<any>(this.URL_API + 'api/auth/register', request, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    login(request: any): Observable<any> {
        return this.httpClient.post<any>(this.URL_API + 'api/auth/login', request, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    resetPassword(request: String): Observable<String> {
        return this.httpClient.post<any>(this.URL_API + 'api/auth/email-reset-password', request, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }
}