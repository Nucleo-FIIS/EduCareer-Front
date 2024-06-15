import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DetalleProfesor } from '../models/detalle-profesor-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleProfesorService {

  URL_API: string = `${environment.HOST_URL}`;

  constructor(  private httpClient: HttpClient ) { }

  getDetalleProfesor(idCurso: Number, idProfesor: Number): Observable<DetalleProfesor> {
    return this.httpClient.get<DetalleProfesor>(`${this.URL_API}/api/profesores/detalle-profesor/${idCurso}/${idProfesor}`).pipe(map(res => res));
  }
}
