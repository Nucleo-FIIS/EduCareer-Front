import { Component, Input } from '@angular/core';
import { ComentarioModel } from 'src/app/models/comentario-model';
import { ComentarioEspecializacionService } from 'src/app/services/comentario-especializacion.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent {
  @Input() comentario_id!: number;
  @Input() especialidad_id!: number;
  respuestas: ComentarioModel[] = [];
  respuestas_mostradas: ComentarioModel[] = [];

  constructor(private service: ComentarioEspecializacionService) { }

  ngOnInit(): void {
    this.service.getRespuestas(this.especialidad_id, this.comentario_id).subscribe(
      (data: ComentarioModel[]) => {
        this.respuestas = data;
      }
    )
  }

  loadResponses() {
    this.respuestas_mostradas = this.respuestas;
  }
}
