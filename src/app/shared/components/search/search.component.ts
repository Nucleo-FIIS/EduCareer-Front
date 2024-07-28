import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { SharedStateService } from 'src/app/services/shared-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  isSelected: boolean = true;
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  idCarrera !: number;
  idCiclo !: number;
  idSeleccionado !: number;
  searchText !: string;

  palabraNoEncontrada: string = '';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private profesoresService: ProfesoresService, private router: Router, private route: ActivatedRoute, private sharedStateService: SharedStateService) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    // Usar una expresión regular para verificar la ruta
    const regex = /^\/profesores\/busqueda\/.*/;

    // if (!currentUrl.includes('/profesores/busqueda')) {
    this.route.params.subscribe(params => {
      try {
        const idCarrera = this.desencriptarId(params['idCarrera']);
        const idCiclo = this.desencriptarId(params['idCiclo']);
        const idCareerParams = +idCarrera; // Convierte el parámetro a número
        const idCicloParams = +idCiclo; // Convierte el parámetro a número
        this.searchText = params['searchTerm'];
        if (!isNaN(idCicloParams) && Number.isInteger(idCicloParams) && !isNaN(idCareerParams) && Number.isInteger(idCareerParams)) {
          this.idCarrera = idCareerParams;
          this.idCiclo = idCicloParams; // Asigna el id solo si es un número entero

          const encodedCarrera = encodeURIComponent(this.encriptarId(this.idCarrera.toString()));
          const encodedCiclo = encodeURIComponent(this.encriptarId(this.idCiclo.toString()));

          if (regex.test(currentUrl)) {
            const idSeleccion = this.desencriptarId(params['idSeleccion']);
            const idSeleccionParams = +idSeleccion; // Convierte el parámetro a número
            if (!isNaN(idSeleccionParams) && Number.isInteger(idSeleccionParams)) {
              this.idSeleccionado = idSeleccionParams; // Asigna el id solo si es un número entero
              const encodedSeleccion = encodeURIComponent(this.encriptarId(this.idSeleccionado.toString()));
              const newRoute = `/profesores/busqueda/${encodedSeleccion}/${encodedCarrera}/${encodedCiclo}/${this.searchText}`;
              this.searchNameUser(this.searchText);

            }
          }
        } else {
          // Redirige si el id no es un número entero
          this.router.navigate(['/profesores/carreras']);
        }
      } catch (e) {
        // Redirige si hay un error en la desencriptación
        this.router.navigate(['/profesores/carreras']);
      }
    });
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    if (this.opcionSeleccionado.length > 0) {
      this.verSeleccion = this.opcionSeleccionado;
      this.isSelected = false;
    }
  }
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  searchClicked(): void {
    this.search();
  }

  cleanClicked(): void {
    if (this.searchInput.nativeElement.value.length > 0) {
      this.searchInput.nativeElement.value = '';
    }
  }

  resetValues(): void {
    this.isSelected = true;
    this.opcionSeleccionado = '0';
    this.searchInput.nativeElement.value = '';
  }

  searchNameUser(searchText: string): void {

    if (this.idSeleccionado && searchText !== '') {
      // Realizar búsqueda según la opción seleccionada
      if (this.idSeleccionado === 1) {
        // Llamar al servicio de cursos
        this.profesoresService.findCourse(searchText, this.idCarrera).subscribe(
          (data) => {
            this.sharedStateService.setSearchResults('busqueda-curso', data);
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(this.idSeleccionado.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchText]);
          },
          (error) => {
            this.sharedStateService.setSearchError('busqueda-curso', error.error.message);
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(this.idSeleccionado.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchText]);
          }
        );
      } else if (this.idSeleccionado === 2) {
        // Llamar al servicio de profesores
        this.profesoresService.findProfesor(searchText).subscribe(
          (data) => {
            this.sharedStateService.setSearchResults('busqueda', data);
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(this.idSeleccionado.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchText]);
          },
          (error) => {
            this.sharedStateService.setSearchError('busqueda', error.error.message);
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(this.idSeleccionado.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchText]);
          }
        );
      }
    }
  }

  search(): void {
    const searchTerm: string = this.searchInput.nativeElement.value.trim();

    if (this.opcionSeleccionado && searchTerm !== '') {
      // Realizar búsqueda según la opción seleccionada
      if (this.opcionSeleccionado === 'Cursos') {
        this.profesoresService.findCourse(searchTerm, this.idCarrera).subscribe(
          (data) => {
            const idSeleccion = 1;
            this.sharedStateService.setSearchResults('busqueda-curso', data);
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(idSeleccion.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchTerm]);
          },
          (error) => {
            const idSeleccion = 1;
            this.sharedStateService.setSearchError('busqueda-curso', error.error.message);
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(idSeleccion.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchTerm]);
          }
        )
        // Llamar al servicio de cursos
        // this.cursosService.findCurso(this.palabraClave).subscribe(...);
      } else if (this.opcionSeleccionado === 'Profesores') {
        // Llamar al servicio de profesores
        this.profesoresService.findProfesor(searchTerm).subscribe(
          (data) => {
            this.sharedStateService.setSearchResults('busqueda', data);
            const idSeleccion = 2;
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(idSeleccion.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchTerm]);
          },
          (error) => {
            const idSeleccion = 2;
            this.sharedStateService.setSearchError('busqueda', error.error.message);
            this.router.navigate(['/profesores/busqueda/' + this.encriptarId(idSeleccion.toString()) + '/' + this.encriptarId(this.idCarrera.toString()) + '/' + this.encriptarId(this.idCiclo.toString()) + '/' + searchTerm]);
          }
        );
      }
    }
  }
}
