import { Component, ElementRef, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { Alerts } from 'src/app/models/alerts-model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertsService } from 'src/app/services/alerts.service';
import { Test } from 'src/app/models/test-model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  toasts: Alerts[] = [];

  isButtonDisabled = true;

  constructor(private alertsService: AlertsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.alertsService.getToasts().subscribe((toast: Alerts) => {
      this.toasts.push(toast);
      setTimeout(() => {
        const alertElement = document.getElementById(`toast-${toast.id_toast}`);
        if (alertElement) {
          alertElement.classList.add('toast-hide');
        }
      }, 4650); // Aplica la clase 'toast-hide' antes de que termine el tiempo total

      setTimeout(() => {
        this.removeAlertById(toast.id_toast);
      }, toast.duration);

      console.clear();
    });
  }

  removeAlertById(alertId: number): void {
    this.toasts = this.toasts.filter(alert => alert.id_toast !== alertId);
  }

  generateSuccessAlert(toast: any): SafeHtml {
    const sanitizedHtml = `
    <div class="mt-5 mx-4 px-4 rounded-md bg-green-50 md:max-w-2xl md:mx-auto"
    *ngFor="let toast of toasts">
      <div class="flex justify-between py-3">
          <div class="flex">
              <div class="text-green-500 text-2xl">
                <i class="uil uil-check-circle"></i>
              </div>
              <div class="self-center ml-3">
                  <span class="text-green-600 font-semibold capitalize">
                  ${toast.type}
                  </span>
                  <p class="text-green-600 mt-1">
                  ${toast.message}
                  </p>
              </div>
          </div>
      </div>
    </div>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  }

  generateDangerAlert(toast: any): SafeHtml {
    const sanitizedHtml = `
    <div class="mt-5 mx-4 px-4 rounded-md bg-red-50 md:max-w-2xl md:mx-auto">
      <div class="flex justify-between py-3">
          <div class="flex">
              <div class="text-red-500 text-2xl">
                <i class="uil uil-times-circle"></i>
              </div>
              <div class="self-center ml-3">
                  <span class="text-red-600 font-semibold capitalize">
                  ${toast.type}
                  </span>
                  <p class="text-red-600 mt-1">
                  ${toast.message}
                  </p>
              </div>
          </div>
      </div>
    </div>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  }

}
