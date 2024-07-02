import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspecialidadModel } from '../models/especialidad-model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecializacionService {

  URL_API: string = `${environment.HOST_URL}`;
  constructor(private http: HttpClient) { }


  findEspecialidad(order: String, filter: String, pag: number) {
    return this.http.get<EspecialidadModel[]>(this.URL_API + '/api/guia/findEspecializaciones?filter=' + filter + '&order=' + order + '&pag=' + pag).pipe(map(res => res));
  }

  findEspecialidadByID(id: number) {
    return this.http.get<EspecialidadModel>(this.URL_API + '/api/guia/findByID/' + id).pipe(map(res => res));
  }

  countEspecialidades(filter: String) {
    return this.http.get<number>(this.URL_API + '/api/guia/countEspecializaciones?filter=' + filter).pipe(map(res => res));
  }
}
