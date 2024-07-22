import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ModalCommentService } from 'src/app/services/modal-comment.service';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.css']
})
export class ModalNotificationComponent {
  mensaje!: string;
  progress: number = 100;
  timeLeft: number = 5;
  timerSubscription!: Subscription;

  constructor(private modalCommentService: ModalCommentService) { }

  ngOnInit(): void {
    this.modalCommentService.dialogNotificationEvent.subscribe((data: any) => {
      // Obtener el mensaje
      this.mensaje = data.message.message;
      if (data.type === 'success') {
        this.showDialog('success');
      } else if (data.type === 'error') {
        this.showDialog('error');
      }
    });
  }

  showDialog(dialogType: string) {
    this.progress = 100;
    this.timeLeft = 5;

    let dialog: HTMLElement | null = document.getElementById(`dialog-${dialogType}`);
    dialog?.classList.remove('hidden');
    setTimeout(() => {
      dialog?.classList.remove('opacity-0');
    }, 20);

    this.timerSubscription = interval(50).subscribe(() => {
      this.progress -= 2;
      this.timeLeft = +(this.timeLeft - 0.1).toFixed(1);

      if (this.progress <= 0) {
        this.hideDialog(dialogType);
      }
    });

    setTimeout(() => {
      this.hideDialog(dialogType);
    }, 5000);
  }

  hideDialog(dialogType: string) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    let dialog: HTMLElement | null = document.getElementById(`dialog-${dialogType}`);
    dialog?.classList.add('opacity-0');
    setTimeout(() => {
      dialog?.classList.add('hidden');
    }, 500);
  }
}
