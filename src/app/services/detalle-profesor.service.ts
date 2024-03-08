import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DetalleProfesor } from '../models/detalle-profesor-model';

@Injectable({
  providedIn: 'root'
})
export class DetalleProfesorService {

  URL_API: string = 'http://localhost:8080/';

  constructor(  private httpClient: HttpClient ) { }

  getDetalleProfesor(id: Number): Observable<DetalleProfesor> {
    return this.httpClient.get<DetalleProfesor>(`${this.URL_API}api/profesores/detalle-profesor/${id}`).pipe(map(res => res));
  }
}
