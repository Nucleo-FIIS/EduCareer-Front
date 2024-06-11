import { Component } from '@angular/core';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent {

  isLoading = true;
  carreras !: any[];

  constructor( private ciclosService: CiclosService ) {
  }

  ngOnInit(): void {
    this.getCycles();
  }

  private mostrarIndicadorDeCarga() {
    this.isLoading = true; // Aseguramos que isLoading se establezca en true
  }

  private ocultarIndicadorDeCarga() {
    this.isLoading = false; // Aseguramos que isLoading se establezca en falso
  }


  getCycles() {
    this.mostrarIndicadorDeCarga();
    this.ciclosService.getAllCarreers().subscribe(
      (data: any) => {
        this.carreras = data.carreras;
        this.ocultarIndicadorDeCarga();
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
  }

  encriptarId(id: string): string {
    return btoa(id);
  }
}
