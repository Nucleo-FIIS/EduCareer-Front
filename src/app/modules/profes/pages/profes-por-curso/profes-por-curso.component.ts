import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoProfesor } from 'src/app/models/curso-profesor-model';
import { Profesores } from 'src/app/models/profesores-model';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { SharedStateService } from 'src/app/services/shared-state.service';

@Component({
  selector: 'app-profes-por-curso',
  templateUrl: './profes-por-curso.component.html',
  styleUrls: ['./profes-por-curso.component.css']
})
export class ProfesPorCursoComponent {
  //profesores: Profesores[] = [];
  profesPorCurso !: CursoProfesor;
  palabraNoEncontrada: string = '';
  public hasLoaded: boolean = false;
  idCarrera !: number;
  idCiclo !: number;
  idCurso !: number;
  showError: boolean = false;

  profesores: any[] = [];
  messageError: string = '';

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
                private profesoresService: ProfesoresService, 
                private router: Router, 
                private route: ActivatedRoute, 
                private title: Title,
                private sharedStateService: SharedStateService) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        const idCarrera = this.desencriptarId(params['idCarrera']);
        const idCiclo = this.desencriptarId(params['idCiclo']);
        const idCurso = this.desencriptarId(params['idCurso']);
        const idCareerParams = +idCarrera; // Convierte el parámetro a número
        const idCicloParams = +idCiclo; // Convierte el parámetro a número
        const idCursoParams = +idCurso; // Convierte el parámetro a número
        if (!isNaN(idCicloParams) && Number.isInteger(idCicloParams) && !isNaN(idCareerParams) && Number.isInteger(idCareerParams) && !isNaN(idCursoParams) && Number.isInteger(idCursoParams)) {
          this.idCarrera = idCareerParams;
          this.idCiclo = idCicloParams; // Asigna el id solo si es un número entero
          this.idCurso = idCursoParams; // Asigna el id solo si es un número entero
          this.getProfesores();

          this.sharedStateService.getSearchResults().subscribe(result => {
            if (result && result.source === 'profes-por-curso') {
              this.profesores = result.data.profesores;
              this.showError = false;
            }
          });
      
          this.sharedStateService.getSearchError().subscribe(error => {
            if (error && error.source === 'profes-por-curso') {
              this.messageError = error.error;
              this.showError = true;
            }
          });
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

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  getProfesores(): void {
    this.profesoresService.getProfesoresPorCurso(this.idCarrera, this.idCiclo, this.idCurso).subscribe(
      (response: any) => {
        this.profesPorCurso = response;
        this.title.setTitle(this.profesPorCurso.nombre_curso  + ' | EduCareer');
        this.sharedStateService.setSearchResults('profes-por-curso', response);
        this.showError = false;
      },
      (error) => {
        this.sharedStateService.setSearchError('profes-por-curso', error.error.message);
        this.showError = true;
      });
  }

  regresar(): void {
    this.searchInput.nativeElement.value = '';
    this.getProfesores();
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }
}
