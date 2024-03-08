import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profesores } from '../models/profesores-model';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  URL_API: string = 'http://localhost:8080/';

  constructor(  private httpClient: HttpClient ) { }

  getProfesores(): Observable<Profesores[]> {
    return this.httpClient.get<Profesores[]>(this.URL_API + 'api/profesor/profesores').pipe( map( res => res ) );
  }

  findProfesor(nombre: String): Observable<Profesores[]> {
    return this.httpClient.get<Profesores[]>(`${this.URL_API}api/profesor/encontrar-profesor/${nombre}`).pipe(map(res => res));
  }
}
