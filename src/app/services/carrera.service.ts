import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarreraModel } from '../models/carrera-model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarreraService {

    URL_API: string = `${environment.HOST_URL}`;
    constructor(private httpClient: HttpClient) { }

    getCarreras(): Observable<CarreraModel[]> {
        return this.httpClient.get<CarreraModel[]>(this.URL_API + '/api/carrera/carreras').pipe(map(res => res));
    }
}