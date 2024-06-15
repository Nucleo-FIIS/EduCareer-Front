import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioModel } from 'src/app/models/comentario-model';
import { ComentarioEspecializacionService } from 'src/app/services/comentario-especializacion.service';

@Component({
  selector: 'app-comentario-especializacion',
  templateUrl: './comentario-especializacion.component.html',
  styleUrls: ['./comentario-especializacion.component.css']
})
export class ComentarioEspecializacionComponent {
  @Input()
  especialidad_id!: number;
  comentarios: ComentarioModel[] = [];

  constructor(private service: ComentarioEspecializacionService) { }

  ngOnInit(): void {
    this.service.getComentarios(this.especialidad_id).subscribe(
      (data: ComentarioModel[]) => {
        this.comentarios = data;
      }
    )
  }
}
