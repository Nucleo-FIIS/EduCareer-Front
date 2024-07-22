import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalCommentService {

  constructor() { }

  dialogEvent = new Subject<any>();
  dialogNotificationEvent = new Subject<any>();

  openDialog(comment: any, type: string) {
    this.dialogEvent.next({ comment, type });
  }

  openDialogNotification(message: any, type: string) {
    this.dialogNotificationEvent.next({ message, type });
  }
}
