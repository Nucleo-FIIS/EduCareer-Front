import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isActive = false;
  isActiveProfile = false;
  userDetails !: string;
  isValid!: boolean;
  infoUser: any = {};
  isLoading: boolean = true;

  constructor(private router: Router, private authService: AuthService, private comentarioService: ComentarioService) {  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData() {
    this.isLoading = true;
    this.isTokenValid().add(() => {
      this.getInfoUser().add(() => {
        this.isLoading = false;
      });
    });
  }

  toggleMenu(): void {
    this.isActive = !this.isActive;
  }

  toggleMenuProfile(): void {
    this.isActiveProfile = !this.isActiveProfile;
  }
  logout(): void {
    this.authService.logout(null).subscribe({
      next: () => {
        this.router.navigate(['/auth/login'])
      },
      error: (error: any) => {
        console.error("Error occurred:", error.message);
      }
    });

  }
  private isTokenValid(): Subscription {
    return this.authService.isTokenValid().subscribe(
      (data: boolean) => {
        this.isValid = data;
      }
    );
  }

  private getInfoUser(): Subscription {
    return this.comentarioService.getInfolUser().subscribe(
      response => {
        this.infoUser = response;
      },
      error => {
        console.log("Error:", error);
      }
    );
  }
}
