import { Component } from '@angular/core';
import { Ciclos, Result } from 'src/app/models/ciclos-model';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent {

  ciclos !: Result[];
  isLoading = true;

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
    this.ciclosService.getAllCycles().subscribe(
      (ciclos: Ciclos) => {
        this.ciclos = ciclos.data.results;
        this.ocultarIndicadorDeCarga();
      },
      (error) => {
        console.error('Error al obtener los ciclos:', error);
      }
    );
  }
  
}
