import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.css']
})
export class ScrollUpComponent {
  showScrollButton!: boolean;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY >= 50) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false; // Asegúrate de restablecer showScrollButton cuando no se cumple la condición
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
