import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profesores } from '../models/profesores-model';
import { catchError } from 'rxjs/operators';
import { CursoProfesor } from '../models/curso-profesor-model';
import { environment } from 'src/environments/environment';
import { Cursos } from '../models/curso-model';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private resultadosBusquedaSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  resultadosBusqueda$ = this.resultadosBusquedaSubject.asObservable();

  private profesoresSubject = new BehaviorSubject<Profesores[]>([]);
  profesores$ = this.profesoresSubject.asObservable();

  private messageSubjectErrorPage: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();

  private idCursoSubject = new BehaviorSubject<number>(0);
  idCurso$ = this.idCursoSubject.asObservable();

  URL_API: string = `${environment.HOST_URL}`;

  constructor(  private httpClient: HttpClient ) { }

  getProfesores(): Observable<Profesores[]> {
    return this.httpClient.get<Profesores[]>(this.URL_API + '/api/profesor/profesores').pipe( map( res => res ) );
  }

  getProfesoresPorCurso(idCarrera: number, idCiclo: number, idCurso: number): Observable<CursoProfesor> {
    return this.httpClient.get<CursoProfesor>(`${this.URL_API}/api/profesor/encontrar-profesor/${idCarrera}/${idCiclo}/${idCurso}`).pipe( map( res => res ) );
  }

  findProfesor(nombre: string): Observable<Profesores[]> {
    return this.httpClient.get<Profesores[]>(`${this.URL_API}/api/profesor/encontrar-profesor/${nombre}`);
  }

  findCourse(nombreCurso: string, idCarrera: number): Observable<Cursos[]> {
    return this.httpClient.get<Cursos[]>(`${this.URL_API}/api/curso/nombre-curso/${nombreCurso}/${idCarrera}`);
  }

  actualizarResultadosBusqueda(resultados: any): void {
    this.resultadosBusquedaSubject.next(resultados);
  }

  mandarIdCurso(idCurso: number): void {
    this.idCursoSubject.next(idCurso);
  }

  enviarError(error: string): void {
    this.errorSubject.next(error);
  }

  getMessageError(): Observable<string> {
    return this.messageSubjectErrorPage.asObservable();
  }

  setMessageError(message: string): void {
    this.messageSubjectErrorPage.next(message);
  }

  setProfesores(profesores: Profesores[]): void {
    this.profesoresSubject.next(profesores);
  }

}
