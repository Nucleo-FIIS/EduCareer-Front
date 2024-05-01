import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciclos } from '../models/ciclos-model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CiclosService {

  private apiUrl = 'assets/data/ciclos.json';

  constructor(private http: HttpClient) {}

  getAllCycles(): Observable<Ciclos> {
    return this.http.get<Ciclos>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error al obtener los ciclos:', error);
        return of({ data: { results: [] } } as Ciclos); // Retorna un observable con un objeto Ciclos vacío
      })
    );
  }
}
