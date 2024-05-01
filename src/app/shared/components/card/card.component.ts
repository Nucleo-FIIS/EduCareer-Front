import { Component } from '@angular/core';
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

  constructor( private profesoresService: ProfesoresService ) { }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 650);
  }

  ngOnInit(): void {
    this.profesoresSubscription = this.profesoresService.profesores$.subscribe(profesores => {
      this.profesores = profesores;
    });
  }

  ngOnDestroy(): void {
    this.profesoresSubscription.unsubscribe();
  }

}
