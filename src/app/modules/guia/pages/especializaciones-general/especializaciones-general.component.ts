import { Component, OnInit } from '@angular/core';
import { EspecialidadModel } from 'src/app/models/especialidad-model';
import { EspecializacionService } from 'src/app/services/especializacion.service';

@Component({
  selector: 'app-especializaciones-general',
  templateUrl: './especializaciones-general.component.html',
  styleUrls: ['./especializaciones-general.component.css']
})
export class EspecializacionesGeneralComponent implements OnInit {
  filtroBusqueda: String = '';
  ordenSeleccionado: String = '';

  public hasLoaded: boolean = false;

  especialidades: EspecialidadModel[] = [];
  paginas: number[] = [];

  constructor(private especializacionService: EspecializacionService) {
  }

  ngOnInit(): void {
    this.buscarEspecialidad();
  }

  buscarEspecialidad() {
    console.log(this.ordenSeleccionado);
    this.especializacionService.findEspecialidad(this.ordenSeleccionado, this.filtroBusqueda, 1).subscribe(
      (data: EspecialidadModel[]) => {
        this.especialidades = data;
      }
    )

    this.especializacionService.countEspecialidades(this.filtroBusqueda).subscribe(
      (data: number) => {
        this.createNumbersArray(data);
      }
    )
  }

  createNumbersArray(num: number) {
    this.paginas = Array.from({ length: num }, (_, i) => i + 1);
  }

  selectPage(pag: number) {
    this.especializacionService.findEspecialidad(this.ordenSeleccionado, this.filtroBusqueda, pag).subscribe(
      (data: EspecialidadModel[]) => {
        this.especialidades = data;
      }
    )
  }

  onLoad() {
    this.hasLoaded = true;
  }
}
