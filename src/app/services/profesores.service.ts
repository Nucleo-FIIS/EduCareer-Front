import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesores } from '../models/profesores-model';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private profesoresURL = 'assets/data/profesores.json';

  constructor(  private http: HttpClient ) { }

  getAllProfesores(): Observable<Profesores> {
    return this.http.get<Profesores>(this.profesoresURL);
  }
}
