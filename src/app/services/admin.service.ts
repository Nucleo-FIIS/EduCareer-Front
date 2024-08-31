import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfesorCursos } from '../models/profesor-cursos';
import { Cursos } from '../models/cursos-model';
import { EspecialidadCarrera } from '../models/especialidad-carrera-model';
import { UserConRol } from '../models/user-con-rol-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  URL_API: string = `${environment.HOST_URL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getProfesoresCursos(page: number, size: number): Observable<ProfesorCursos> {
    return this.http.get<ProfesorCursos>(this.URL_API + '/api/admin/obtener-profesores-cursos' + `?page=${page}&size=${size}`).pipe(map(res => res));
  }

  getCursos(page: number, size: number, search: string): Observable<Cursos> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Cursos>(`${this.URL_API}/api/admin/obtener-cursos`, { params }).pipe(map(res => res));
  }

  eliminarCurso(idCurso: number): Observable<any> {
    return this.http.put<any>(`${this.URL_API}/api/admin/eliminar-curso`, idCurso).pipe(map(res => res));
  }

  getEspecialidadesPorCarrera(page: number, size: number, search: string): Observable<EspecialidadCarrera> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<EspecialidadCarrera>(`${this.URL_API}/api/admin/obtener-especialidades-carreras`, { params }).pipe(map(res => res));
  }

  // getUsersConRol(page: number, size: number): Observable<UserConRol> {
  //   return this.http.get<UserConRol>(this.URL_API + '/api/admin/obtener-usuarios-con-rol' + `?page=${page}&size=${size}`).pipe(map(res => res));
  // }

  getUsersConRol(page: number, size: number, sort?: string, filter?: string): Observable<UserConRol> {
    let url = `${this.URL_API}/api/admin/obtener-usuarios-con-rol?page=${page}&size=${size}`;
    if (sort) {
      url += `&sort=${sort}`;
    }
    if (filter) {
      url += `&filter=${filter}`;
    }
    return this.http.get<UserConRol>(url).pipe(map(res => res));
  }

  getUsersWithRole(page: number, size: number, sort: string, filter: string, search: string): Observable<UserConRol> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    if (filter) {
      params = params.set('filter', filter);
    }

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<UserConRol>(`${this.URL_API}/api/admin/obtener-usuarios-con-rol`, { params }).pipe(map(res => res));
  }


  /**
   * Edita el rol de un usuario.
   * @param updateRol Un objeto que contiene el id del usuario y el nuevo rol.
   * @returns Un Observable que emite el resultado de la petición.
   */
  editarRolUsuario(updateRol: any): Observable<any> {
    return this.http.put<any>(`${this.URL_API}/api/admin/actualizar-rol`, updateRol).pipe(map(res => res));
  }


  /**
   * Elimina un usuario.
   * @param deleteUser Un objeto que contiene el id del usuario a eliminar.
   * @returns Un Observable que emite el resultado de la petición.
   */
  eliminarUsuario(deleteUser: any): Observable<any> {
    return this.http.put<any>(`${this.URL_API}/api/admin/eliminar-usuario`, deleteUser).pipe(map(res => res));
  }

}
