import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarreraModel } from '../models/carrera-model';

@Injectable({
    providedIn: 'root'
})
export class CarreraService {

    URL_API: string = 'http://localhost:8080/';
    constructor(private httpClient: HttpClient) {

    }

    getCarreras(): Observable<CarreraModel[]> {
        return this.httpClient.get<CarreraModel[]>(this.URL_API + 'api/carrera/carreras').pipe(map(res => res));
    }
}