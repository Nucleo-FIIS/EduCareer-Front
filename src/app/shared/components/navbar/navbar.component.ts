import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isActive = false;
  isActiveProfile = false;

  toggleMenu(): void {
    this.isActive = !this.isActive;
  }

  toggleMenuProfile(): void {
    this.isActiveProfile = !this.isActiveProfile;
  }
}
