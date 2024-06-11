import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciclos, Result } from 'src/app/models/ciclos-model';
import { Cursos } from 'src/app/models/curso-model';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-curso-ciclo',
  templateUrl: './curso-ciclo.component.html',
  styleUrls: ['./curso-ciclo.component.css']
})
export class CursoCicloComponent {

  public hasLoaded: boolean = false;
  id !: number;
  idCarrera !: number;
  ciclos !: Result[];
  cursos !: Cursos[];

  constructor(private route: ActivatedRoute, private router: Router, private ciclosService: CiclosService, private title: Title) {
    this.route.params.subscribe(params => {
      try {
        const id = this.desencriptarId(params['id']);
        const idCarrera = this.desencriptarId(params['idCarrera']);
        const idFromParams = +id; // Convierte el parámetro a número
        const idCareerParams = +idCarrera; // Convierte el parámetro a número
        if (!isNaN(idFromParams) && Number.isInteger(idFromParams) && !isNaN(idCareerParams) && Number.isInteger(idCareerParams)) {
          this.id = idFromParams; // Asigna el id solo si es un número entero
          this.idCarrera = idCareerParams;
          this.mostrarProfesores();
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
    this.hasLoaded = true;
  }

  mostrarProfesores(): void {
    if (this.id && this.id > 0 && this.id <= 10 && this.idCarrera && this.idCarrera > 0 && this.idCarrera <= 3) {
      this.ciclosService.getAllCarreers().subscribe((data: any) => {
        const carrera = data.carreras.find((c: any) => c.id === this.idCarrera);
        if (carrera) {
          this.ciclosService.getAllCycles().subscribe((ciclos: Ciclos) => {
            const ciclo = ciclos.data.results.find(c => c.id === this.id);
            if (ciclo) {
              this.title.setTitle(carrera.name + ' - ' + ciclo.cycleNumber + ' | EduCareer'); // Opcional: Cambiar el título del documento
              this.ciclosService.getCoursesByCarreer(this.idCarrera, this.id).subscribe(
                (response: Cursos[]) => {
                  this.cursos = response;
                },
                (error) => {
                  this.router.navigate(['/profesores/carreras']);
                })
            } else {
              // Si no se encuentra el ciclo, redirigir o manejar el error
              this.router.navigate(['/profesores/carreras']);
            }
          });
        } else {
          // Si no se encuentra la carrera, redirigir o manejar el error
          this.router.navigate(['/profesores/carreras']);
        }
      });
    } else {
      this.router.navigate(['/profesores/carreras']);
    }
  };

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }
}
