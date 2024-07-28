import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/models/curso-model';
import { Profesores } from 'src/app/models/profesores-model';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { SharedStateService } from 'src/app/services/shared-state.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  profesores: Profesores[] = [];
  cursos: Cursos[] = [];
  error: string = '';
  showError: boolean = false;
  showErrorCourses: boolean = false;

  idCarrera !: number;
  idCiclo !: number;

  constructor(private profesoresService: ProfesoresService, private sharedStateService: SharedStateService, private route: ActivatedRoute, private router: Router, private title: Title) {
    this.route.params.subscribe(params => {
      try {
        const idCarrera = this.desencriptarId(params['idCarrera']);
        const idCiclo = this.desencriptarId(params['idCiclo']);
        const search = params['searchTerm'];
        this.title.setTitle(search.toUpperCase() + ' | EduCareer');
        const idCareerParams = +idCarrera; // Convierte el parámetro a número
        const idCicloParams = +idCiclo; // Convierte el parámetro a número
        if (!isNaN(idCicloParams) && Number.isInteger(idCicloParams) && !isNaN(idCareerParams) && Number.isInteger(idCareerParams)) {
          this.idCarrera = idCareerParams;
          this.idCiclo = idCicloParams; // Asigna el id solo si es un número entero

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

  ngOnInit(): void {
    this.sharedStateService.getSearchResults().subscribe(result => {
      if (result && result.source === 'busqueda') {
        this.profesores = result.data;
        this.showError = false;
        this.showErrorCourses = false;
      }

      if (result && result.source === 'busqueda-curso') {
        this.cursos = result.data;
        this.showError = false;
        this.showErrorCourses = true;
      }
    });

    this.sharedStateService.getSearchError().subscribe(error => {
      if (error && error.source === 'busqueda') {
        this.error = error.error;
        this.showError = true;
      }

      if (error && error.source === 'busqueda-curso') {
        this.error = error.error;
        this.showError = true;
      }
    });
  }

  limpiarError(): void {
    this.profesoresService.enviarError('');
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }
}


