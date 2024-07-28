import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  @Input() cursos: any[] = [];

  idCarrera !: number;
  idCiclo !: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      try {
        const idCarrera = this.desencriptarId(params['idCarrera']);
        const idCiclo = this.desencriptarId(params['idCiclo']);
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

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }

}
