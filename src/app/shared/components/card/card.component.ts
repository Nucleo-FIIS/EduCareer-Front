import { Component, Input } from '@angular/core';
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
  //profesores: Profesores[] = [];
  public hasLoaded: boolean = false;
  profesoresSubscription !: Subscription;
  idCursoSubscription !: Subscription;
  
  idCurso !: number;
  isShowNameCourse: boolean = false;

  @Input() profesores: any[] = [];
  constructor(private router: Router ) {  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/profesores/busqueda')) {
      this.isShowNameCourse = true;
    }
  }

  encriptarId(id: string): string {
    return btoa(id);
  }

  desencriptarId(encryptedId: string): string {
    return atob(encryptedId);
  }

}
