import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ciclos } from '../models/ciclos-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiclosService {

  private apiUrl = 'assets/data/ciclos.json';

  constructor(private http: HttpClient) {}

  getAllCycles(): Observable<Ciclos> {
    return this.http.get<Ciclos>(this.apiUrl);
  }
}
