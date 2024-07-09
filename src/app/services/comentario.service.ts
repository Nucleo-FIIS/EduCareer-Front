import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioModel } from '../models/comentario-model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  URL_API: string = `${environment.HOST_URL}`;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getComentariosEsp(id_especialidad: number) {
    return this.http.get<ComentarioModel[]>(this.URL_API + '/api/comentario/findCommentsEsp/' + id_especialidad).pipe(map(res => res));
  }

  getRespuestasEsp(id_especialidad: number, id_comentario_padre: number) {
    return this.http.get<ComentarioModel[]>(this.URL_API + '/api/comentario/findResponsesEsp/' + id_especialidad + '/' + id_comentario_padre).pipe(map(res => res));
  }

  postCommesponsesEsp(payload: any): Observable<any> {

    return this.http.post(this.URL_API + '/api/comentario/postCommesponsesEsp', payload, { withCredentials: true })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getComentariosProf(id_curso: number, id_prof: number) {
    return this.http.get<ComentarioModel[]>(this.URL_API + '/api/comentario/findCommentsProf/' + id_curso + '/' + id_prof).pipe(map(res => res));
  }

  getRespuestasProf(id_curso: number, id_prof: number, id_comentario_padre: number) {
    return this.http.get<ComentarioModel[]>(this.URL_API + '/api/comentario/findResponsesProf/' + id_curso + '/' + id_prof + '/' + id_comentario_padre).pipe(map(res => res));
  }


  postCommesponsesProf(payload: any): Observable<any> {

    return this.http.post(this.URL_API + '/postCommesponsesProf', payload, { withCredentials: true })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}