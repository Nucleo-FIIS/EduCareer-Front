import { Component, Input } from '@angular/core';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  message !: string;

  constructor( private profesoresService: ProfesoresService) { }

  ngOnInit(): void {
    this.profesoresService.getMessageError().subscribe(message => {
      this.message = message;
    });
  }

}
