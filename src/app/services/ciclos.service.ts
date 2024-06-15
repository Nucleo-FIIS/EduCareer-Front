import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciclos } from '../models/ciclos-model';
import { Observable } from 'rxjs';
import { Cursos } from '../models/curso-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiclosService {

  private apiCiclos = 'assets/data/ciclos.json';
  private apiCarreras = 'assets/data/carreras.json';

  URL_API: string = `${environment.HOST_URL}`;

  constructor(private http: HttpClient) {}

  getAllCycles(): Observable<Ciclos> {
    return this.http.get<Ciclos>(this.apiCiclos);
  }

  getAllCarreers(): Observable<any> {
    return this.http.get<any>(this.apiCarreras);
  }

  getCoursesByCarreer(idCarrera: number, idCiclo: number): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(`${this.URL_API}/api/curso/carrera/${idCarrera}/ciclo/${idCiclo}/encontrar-cursos`);
  }
}
