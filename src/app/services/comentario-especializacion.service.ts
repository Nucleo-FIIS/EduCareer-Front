import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioModel } from '../models/comentario-model';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioEspecializacionService {

  URL_API: string = `${environment.HOST_URL}`;

  constructor(private http: HttpClient) { }

  getComentarios(id_especialidad: number) {
    return this.http.get<ComentarioModel[]>(this.URL_API + '/api/comentarioEsp/findComments/' + id_especialidad).pipe(map(res => res));
  }

  getRespuestas(id_especialidad: number, id_comentario_padre: number) {
    return this.http.get<ComentarioModel[]>(this.URL_API + '/api/comentarioEsp/findResponses/' + id_especialidad + '/' + id_comentario_padre).pipe(map(res => res));
  }
}
