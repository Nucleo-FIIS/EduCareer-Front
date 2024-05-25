import { Component } from '@angular/core';
import { EspecialidadModel, EspecialidadPaginada } from 'src/app/models/especialidad-model';
import { EspecializacionService } from 'src/app/services/especializacion.service';

@Component({
  selector: 'app-especializaciones-general',
  templateUrl: './especializaciones-general.component.html',
  styleUrls: ['./especializaciones-general.component.css']
})
export class EspecializacionesGeneralComponent {
  filtroBusqueda: string = '';
  ordenSeleccionado: string = 'ASC';

  public hasLoaded: boolean = false;

  especialidades: EspecialidadPaginada = [];
  paginaSeleccionada: EspecialidadModel[] = [];
  // i es la página en la que estamos
  i: number = -1;

  constructor(private especializacionService: EspecializacionService) {
  }

  ngOnInit(): void {
    this.loadEspecialidades(this.ordenSeleccionado);
  }

  loadEspecialidades(order: string) {
    this.especializacionService.getAllEspecialidades(order).subscribe(
      (data: EspecialidadPaginada) => {
        this.especialidades = data;
        this.selectPage(0);
        console.log(this.paginaSeleccionada);
      }
    )
  }

  buscarEspecialidad(order: string, filter: string) {
    this.especializacionService.findEspecialidad(order, filter).subscribe(
      (data: EspecialidadPaginada) => {
        this.especialidades = data;
        this.selectPage(0);
        console.log(this.paginaSeleccionada);
      }
    )
    /* this.especialidades=[...this.especialidadesAll];
    this.especialidades = this.especialidades.filter(curso => curso.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(this.filtroBusqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())); */
  }

  selectPage(index: number) {
    // index es la página a la que se quiere llegar
    this.i = index;
    this.paginaSeleccionada = this.especialidades[this.i];
  }




  filtroEspecialidad() {
    /* this.especialidades=[...this.especialidadesAll];
    if (this.ordenSeleccionado === 'asc') {
      this.especialidades = this.especialidades.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.ordenSeleccionado === 'desc') {
      this.especialidades = this.especialidades.sort((a, b) => b.title.localeCompare(a.title));
    } */
  }

  onLoad() {
    this.hasLoaded = true;
  }
}
