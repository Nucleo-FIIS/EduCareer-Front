import { Component } from '@angular/core';
import { ComentarioAdm } from 'src/app/models/comment.model';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  showFilterMenu = false;
  selectedTab:number=2;
  comentarios: ComentarioAdm[] = [];
  
  constructor(private commentService: ComentarioService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getComentarios(2);
  }

  selectTab(i:number){
    this.selectedTab=i;
    this.getComentarios(i);
  }

  getComentarios(i:number){
    this.commentService.getComentariosAdm(i).subscribe(data => {
      this.comentarios = data;
    })
  }

  setCommentState(comment:ComentarioAdm,id_estado:number){
    const payload = {
      tipo_comentario: comment.tipo_comentario,
      id_comentario: comment.id_comentario,
      id_estado: id_estado
    };
    console.log("Payload:", payload);
      this.commentService.changeCommentState(payload).subscribe(
        response => {
          console.log('Respuesta publicada exitosamente:', response);
          this.getComentarios(this.selectedTab);
        },
        error => {
          console.error('Error al enviar respuesta:', error);
        }
      );
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  filterBy(criteria: string) {
    // Implementación de filtrado
  }

  sortByDate(order: string) {
    // Implementación de ordenamiento
  }
}
