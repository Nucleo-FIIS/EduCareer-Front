import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    URL_API: string = `${environment.HOST_URL}`;
    AUTH_COOKIE_NAME: string = 'auth_token';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    httpOptionslogin = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        withCredentials: true
    };
    constructor(private httpClient: HttpClient, private cookieService: CookieService) {

    }
    handleError(error: HttpErrorResponse): Observable<any> {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            console.log(error)
            if (error.status === 0) {
                errorMessage = 'Error al conectar con el servidor';
            } else {
                errorMessage = error.error.message;
            }
        }
        return throwError(() => new Error(errorMessage));
    }
    register(request: any): Observable<any> {
        return this.httpClient.post<any>(this.URL_API + '/api/auth/register', request, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    login(request: any): Observable<any> {
        return this.httpClient.post<any>(this.URL_API + '/api/auth/login', request, this.httpOptionslogin).pipe(
            catchError(this.handleError)
        );
    }
    logout(request: any): Observable<any> {
        return this.httpClient.post<any>(this.URL_API + '/api/auth/logout', request, this.httpOptionslogin).pipe(
            catchError(this.handleError)
        );
    }
    resetPassword(request: String): Observable<String> {
        return this.httpClient.post<any>(this.URL_API + '/api/auth/email-reset-password', request, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    pruebaUser(): Observable<any> {
        return this.httpClient.get<any>(this.URL_API + '/api/pruebas/user', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        }).pipe(
            catchError(this.handleError)
        )
    }

    isTokenValid(): Observable<boolean> {
        return this.httpClient.get<boolean>(`${this.URL_API}/api/auth/isValid`, { withCredentials: true }).pipe(
            catchError(error => {
                console.error('Error verificando el token', error);
                return of(false);
            })
        );
    }
}