import { Component, ElementRef, ViewChild } from '@angular/core';
import { Alerts } from 'src/app/models/alerts-model';
import { Test } from 'src/app/models/test-model';
import { AlertsService } from 'src/app/services/alerts.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
  duration: number;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  // Assuming Toast is defined somewhere, otherwise, define it accordingly
  toasts: Alerts[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;

  isButtonDisabled = true;

  constructor(private alertsService: AlertsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.addEventListener('input', () => {
        this.handleInput();
      });
    }
  }

  handleInput(): void {
    if (this.searchInput && this.searchInput.nativeElement) {
      const inputValue = this.searchInput.nativeElement.value.trim();
      this.isButtonDisabled = inputValue.length === 0;
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.realizarTest();
    }
  }

  searchClicked(): void {
    this.realizarTest();
  }

  realizarTest() {
    const inputValue = this.searchInput.nativeElement.value.trim();

    if (inputValue.length > 0) {
      this.isButtonDisabled = true; // Deshabilitar el botón antes de realizar la acción
      this.searchInput.nativeElement.value = ''; // Limpiar el campo después de hacer clic en Enviar
    } else {
      return; // Evitar realizar la acción si el campo está vacío
    }

    const test: Test = {
      email: inputValue
    };

    this.alertsService.realizarTest(test).subscribe(
      response => {
        this.addToasts(response);
      },
      error => {
        this.addToasts(error.error);
      }
    );
  }

  removeAlertById(alertId: number): void {
    this.toasts = this.toasts.filter(alert => alert.id_toast !== alertId);
  }

  addToasts(alert: Alerts): void {
    this.toasts.push(alert);

    
    setTimeout(() => {
      const alertElement = document.getElementById(`toast-${alert.id_toast}`);
      if (alertElement) {
        alertElement.classList.add('toast-hide');
      }
    }, 4650); // Aplica la clase 'toast-hide' antes de que termine el tiempo total

    setTimeout(() => {
      this.removeAlertById(alert.id_toast);
    }, alert.duration);
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



