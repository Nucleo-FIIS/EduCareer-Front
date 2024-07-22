import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ModalCommentService } from 'src/app/services/modal-comment.service';

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.css']
})
export class ModalCommentComponent {

  editingCommentText: string = '';
  originalCommentText: string = '';
  isModified: boolean = false;
  @ViewChild('editTextarea') editTextarea!: ElementRef;
  idCurso !: number;
  idProfesor !: number;
  isValid!: boolean;
  idComentario !: number;

  constructor(private modalCommentService: ModalCommentService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    this.modalCommentService.dialogEvent.subscribe((data: any) => {
      
      // Obtener el id del comentario a editar o eliminar
      this.idComentario = data.comment.id_comentario;

      if (data.type === 'edit') {
        this.originalCommentText = data.comment.comentario;
        this.editingCommentText = data.comment.comentario;
        this.isModified = false;
        this.showDialog('edit');
        setTimeout(() => {
          this.editTextarea.nativeElement.focus();
        }, 20); // Delay to ensure the dialog is visible
      } else if (data.type === 'delete') {
        this.showDialog('delete');
      }
    });

    this.route.parent?.params.subscribe(params => {
      try {
        this.idCurso = +this.desencriptarId(params['idCurso']);
        this.idProfesor = +this.desencriptarId(params['idProfesor']);
      } catch (e) {
        console.error("Error desencriptando IDs en posts.component", e);
        this.router.navigate(['/profesores/carreras']);
        // Manejar el error de forma apropiada, por ejemplo, redirigir o mostrar un mensaje de error
      }
    });

    this.isTokenValid();
  }

  private desencriptarId(encryptedId: string): string {
    try {
      return atob(encryptedId);
    } catch (e) {
      console.error("Error desencriptando ID", e);
      throw e; // Relanzar el error para que sea manejado donde se llama la función
    }
  }

  showDialog(dialogType: string) {
    let dialog: HTMLElement | null = document.getElementById(`dialog-${dialogType}`);
    dialog?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      dialog?.classList.remove('opacity-0');
    }, 20);
  }

  hideDialog(dialogType: string) {
    let dialog: HTMLElement | null = document.getElementById(`dialog-${dialogType}`);
    dialog?.classList.add('opacity-0');
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      dialog?.classList.add('hidden');
    }, 500);
  }

  onInputChange(event: any) {
    this.isModified = this.editingCommentText !== this.originalCommentText;
  }

  private isTokenValid() {
    this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
        //this.isAvailable = !this.isValid;
      }
    );
  }

  confirmEdit() {
    // Logic to save the edited comment
    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        id_comentario: this.idComentario,
        comentario: this.editingCommentText,
        id_profesor: this.idProfesor,
        id_curso: this.idCurso
      };
      this.comentarioService.editCommentProf(payload).subscribe(
        response => {
          this.modalCommentService.openDialogNotification(response, 'success');
          this.hideDialog('edit');
        },
        error => {
          this.modalCommentService.openDialogNotification(error, 'error');
          console.error('Error al enviar comentario:', error);
        }
      );
    }
  }

  confirmDelete() {
    // Logic to delete the comment
    this.isTokenValid();
    if (!this.isValid) {
      window.location.reload();
    } else {
      const payload = {
        id_comentario: this.idComentario,
        id_profesor: this.idProfesor,
        id_curso: this.idCurso
      };
      this.comentarioService.deleteCommentProf(payload).subscribe(
        response => {
          this.modalCommentService.openDialogNotification(response, 'success');
          this.hideDialog('delete');
        },
        error => {
          this.modalCommentService.openDialogNotification(error, 'error');
          console.error('Error al enviar comentario:', error);
        }
      );
    }
  }
}
