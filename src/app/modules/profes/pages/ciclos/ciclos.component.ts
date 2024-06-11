import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciclos, Result } from 'src/app/models/ciclos-model';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent {

  ciclos !: any[];
  isLoading = true;
  nombreCarrera !: string;
  idCarrera !: number;
  id !: number;

  constructor(private ciclosService: CiclosService, private route: ActivatedRoute, private router: Router, private title: Title) {
    this.route.params.subscribe(params => {
      try {
        const id = this.desencriptarId(params['id']);
        const idFromParams = +id; // Convierte el parámetro a número
        if (!isNaN(idFromParams) && Number.isInteger(idFromParams)) {
          this.id = idFromParams; // Asigna el id solo si es un número entero
          this.mostrarCiclos();
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

  private mostrarIndicadorDeCarga() {
    this.isLoading = true; // Aseguramos que isLoading se establezca en true
  }

  private ocultarIndicadorDeCarga() {
    this.isLoading = false; // Aseguramos que isLoading se establezca en falso
  }

  mostrarCiclos() {
    this.mostrarIndicadorDeCarga();
    if (this.id && this.id > 0 && this.id <= 3) {
      this.ciclosService.getAllCarreers().subscribe((data: any) => {
        const carrera = data.carreras.find((c: any) => c.id === this.id);
        if (carrera) {
          this.nombreCarrera = carrera.name;
          this.idCarrera = carrera.id;
          this.title.setTitle(carrera.name + ' | EduCareer');
          this.ciclosService.getAllCycles().subscribe(
            (ciclos: Ciclos) => {
              this.ciclos = ciclos.data.results;
              this.ocultarIndicadorDeCarga();
            },
            (error) => {
              console.error('Error al obtener los ciclos:', error);
            }
          );
        } else {
          // Si no se encuentra el ciclo, redirigir o manejar el error
          this.router.navigate(['/profesores/carreras']);
        }
      });
    } else {
      this.router.navigate(['/profesores/carreras']);
    }
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }

}
