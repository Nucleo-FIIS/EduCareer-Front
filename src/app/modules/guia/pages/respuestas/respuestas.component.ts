import { Component, Input } from '@angular/core';
import { ComentarioModel } from 'src/app/models/comentario-model';
import { ComentarioService } from 'src/app/services/comentario.service';

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

  isHiden: boolean = false;

  constructor(private service: ComentarioService) { }

  ngOnInit(): void {
    this.service.getRespuestasEsp(this.especialidad_id, this.comentario_id).subscribe(
      (data: ComentarioModel[]) => {
        this.respuestas = data;
      }
    )
  }

  loadResponses() {
    this.respuestas_mostradas = this.respuestas;
    this.isHiden = true;
  }

  hideResponses() {
    this.respuestas_mostradas = [];
    this.isHiden = false;
  }
}
