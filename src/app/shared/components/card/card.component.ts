import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profesores } from 'src/app/models/profesores-model';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  profesores: Profesores[] = [];
  public hasLoaded: boolean = false;
  profesoresSubscription !: Subscription;
  
  idCurso !: number;

  constructor( private profesoresService: ProfesoresService,private router: Router, private route: ActivatedRoute ) {  
    
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      try {
        const idCurso = this.desencriptarId(params['idCurso']);
        const idCursoParams = +idCurso; // Convierte el parámetro a número
        if (!isNaN(idCursoParams) && Number.isInteger(idCursoParams)) {
          this.idCurso = idCursoParams; // Asigna el id solo si es un número entero
          this.profesoresSubscription = this.profesoresService.profesores$.subscribe(profesores => {
            this.profesores = profesores;
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

  ngOnDestroy(): void {
    this.profesoresSubscription.unsubscribe();
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }

}
