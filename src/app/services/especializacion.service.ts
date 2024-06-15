import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspecialidadModel, EspecialidadPaginada } from '../models/especialidad-model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecializacionService {

  URL_API: string = `${environment.HOST_URL}`;
  constructor(private http: HttpClient) { }

  getAllEspecialidades(order: string): Observable<EspecialidadPaginada> {
    return this.http.get<EspecialidadPaginada>(this.URL_API + '/api/guia/findAll/' + order).pipe(map(res => res));
  }

  findEspecialidad(order: string, filter: string): Observable<EspecialidadPaginada> {
    return this.http.get<EspecialidadPaginada>(this.URL_API + '/api/guia/findBy/' + filter + '/' + order).pipe(map(res => res));
  }

  findEspecialidadByID(id: number) {
    return this.http.get<EspecialidadModel>(this.URL_API + '/api/guia/findByID/' + id).pipe(map(res => res));
  }
}
