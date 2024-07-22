import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioModel } from '../models/comentario-model';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  URL_API: string = `${environment.HOST_URL}`;
  comentariosProfesores = 'assets/data/comentarios.json';

  private commentsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public comments$: Observable<any[]> = this.commentsSubject.asObservable();

  private votesSubject = new BehaviorSubject<any>(null);
  votes$ = this.votesSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getComments(id_curso: number, id_prof: number): Observable<any> {
    return this.http.get<any>(this.URL_API + '/api/comentario/obtenerComentariosProfesor/' + id_curso + '/' + id_prof).pipe(
      map((response: any) => {
        this.commentsSubject.next(response.comments);
        return response;
      }));
  }

  getVotes(id_curso: number, id_prof: number): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/api/comentario/obtenerVotaciones/${id_curso}/${id_prof}`).pipe(
      map(res => res),
      tap(res => this.votesSubject.next(res))
    );
  }

  getCommentss(): Observable<any> {
    return this.http.get<any>(this.comentariosProfesores).pipe(map(res => res));
  }

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

  postCommentResponsesProf(payload: any): Observable<any> {

    return this.http.post(this.URL_API + '/api/comentario/postCommentResponsesProf', payload, { withCredentials: true })
      .pipe(
        map(response => {
          this.getComments(payload.id_curso, payload.id_profesor).subscribe();
          return response;
        }))
  }

  updateComments(comments: any[]): void {
    this.commentsSubject.next(comments);
  }

  getEmailUser(): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(this.URL_API + '/api/comentario/getEmailUser', { withCredentials: true }).pipe(
      map(res => res)
    );
  }

  postVotesResponsesProf(payload: any): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/api/comentario/postVotesResponsesProf`, payload, { withCredentials: true }).pipe(
      tap(() => {
        // Refresca los votos después de que se haya publicado un voto
        this.getVotes(payload.id_curso, payload.id_profesor).subscribe();
      })
    );
  }

  getVoteUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/api/comentario/getVotesResponsesUser`, payload, { withCredentials: true }).pipe(map(res => res));
  }

  editCommentProf(payload: any): Observable<any> {
    // Lo puedes hacer lo que quieras con el comentario editado
    return this.http.post<any>(`${this.URL_API}/api/comentario/editCommentProf`, payload, { withCredentials: true }).pipe(
      map(response => {
        this.getComments(payload.id_curso, payload.id_profesor).subscribe();
        return response;
      }))
  }

  deleteCommentProf(payload: any): Observable<any> {
    // Lo puedes hacer lo que quieras con el comentario eliminado
    return this.http.post<any>(`${this.URL_API}/api/comentario/deleteCommentProf`, payload, { withCredentials: true }).pipe(
      map(response => {
        this.getComments(payload.id_curso, payload.id_profesor).subscribe();
        return response;
      }))
  }  
}