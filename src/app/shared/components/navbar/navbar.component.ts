import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isActive = false;
  isActiveProfile = false;

  constructor(private router:Router,private authService:AuthService){

  }

  toggleMenu(): void {
    this.isActive = !this.isActive;
  }

  toggleMenuProfile(): void {
    this.isActiveProfile = !this.isActiveProfile;
  }
  logout():void{
    this.authService.logout(null).subscribe({
      next:() => {
        this.router.navigate(['/auth/login'])
      },
      error:(error: any) => {
        console.error("Error occurred:", error.message);
      }
    });

  }
}
