import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Profesores } from 'src/app/models/profesores-model';
import { ObjectSearch } from 'src/app/models/search-model';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  isSelected: boolean = true;
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  palabraNoEncontrada: string = '';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private profesoresService: ProfesoresService, private router: Router) { }


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

  // search(): void {
  //   const searchTerm: string = this.searchInput.nativeElement.value.trim();

  //   if (searchTerm.length > 0) {
  //     // Expresión regular para validar número entero o decimal
  //     const regex = /^[+-]?\d+(\.\d+)?$/;
  //     if (regex.test(searchTerm)) {
  //       // Si es un número entero o decimal, muestra mensaje de error
  //       this.profesoresService.enviarError('Formato de búsqueda no válido. Debe digitar en formato de texto, no un número 😡.');
  //       this.profesoresService.enviarProfesores([]);
  //       this.router.navigate(['/profesores/busqueda']);
  //       this.resetState(); // Limpiar el estado
  //     } else {
  //       // Si es un texto, realiza la búsqueda
  //       this.profesoresService.findProfesor(searchTerm).subscribe(
  //         (data: Profesores[]) => {
  //           this.profesoresService.enviarProfesores(data);
  //           this.router.navigate(['/profesores/busqueda']);
  //           this.resetState(); // Limpiar el estado
  //         },
  //         (error) => {
  //           this.profesoresService.enviarError(error.error.message);
  //           this.profesoresService.enviarProfesores([]);
  //           this.router.navigate(['/profesores/busqueda']);
  //           this.resetState(); // Limpiar el estado
  //         }
  //       );
  //     }

  //     this.resetValues();
  //   }
  // }

  search(): void {
    const searchTerm: string = this.searchInput.nativeElement.value.trim();

    // Limpiar el estado de la búsqueda antes de realizar una nueva búsqueda
    this.profesoresService.actualizarResultadosBusqueda(null);
    this.profesoresService.enviarError('');

    if (this.opcionSeleccionado && searchTerm !== '') {
      // Realizar búsqueda según la opción seleccionada
      if (this.opcionSeleccionado === 'Cursos') {
        // Llamar al servicio de cursos
        // this.cursosService.findCurso(this.palabraClave).subscribe(...);
      } else if (this.opcionSeleccionado === 'Profesores') {
        // Llamar al servicio de profesores
        this.profesoresService.findProfesor(searchTerm).subscribe(
          (data) => {
            this.profesoresService.actualizarResultadosBusqueda(data);
            this.router.navigate(['/profesores/busqueda']);
          },
          (error) => {
            this.profesoresService.enviarError(error.error.message);
            this.router.navigate(['/profesores/busqueda']);
          }
        );
      }
    }
  }


  // resetState(): void {
  //   this.profesoresService.enviarError(''); // Limpiar el error
  //   this.profesoresService.enviarProfesores([]); // Limpiar los datos
  // }

}
