import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilService } from 'src/app/services/perfil-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  profileForm: FormGroup;
  isButtonDisabled = true;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = 'https://www.conpaas.org/wp-content/uploads/2016/06/team-1.jpg';
  successMessage: string = ''; 
  errorMessage: string = ''; // Mensaje de error para la contraseña

  constructor(
    private elementRef: ElementRef,
    private perfilService: PerfilService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      old_password: [''],
      password: [''],
      genero: ['', Validators.required],
      carrera: ['', Validators.required]
    });

    this.profileForm.valueChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }

  ngOnInit(): void {
    this.loadUserProfile(); 
  }

  checkFormValidity() {
    this.isButtonDisabled = !this.profileForm.valid || !this.profileForm.dirty;
  }

  loadUserProfile() {
    const email = 'john.doe@example.com'; 

    this.perfilService.getProfileData(email).subscribe(
      (data) => {
        this.profileForm.patchValue({
          nombre: data.nombre,
          genero: data.genero,
          carrera: data.carrera
        });
        this.imageUrl = data.imageUrl || this.imageUrl;
      },
      (error) => {
        console.error('Error al obtener los datos del perfil:', error);
      }
    );
  }

  async updateProfile() {
    const email = 'john.doe@example.com';  // Debes obtener el email dinámicamente según tu implementación
    this.isButtonDisabled = true;
  
    const oldPassword = this.profileForm.get('old_password')?.value;
    const newPassword = this.profileForm.get('password')?.value;
  
    // Verificar si se ingresó la contraseña antigua
    if (oldPassword && newPassword) {
      try {
        const isOldPasswordCorrect = await firstValueFrom(this.perfilService.verifyOldPassword(email, oldPassword));
      
        if (!isOldPasswordCorrect) {
          this.successMessage = 'La contraseña antigua es incorrecta.';
          console.error('La contraseña antigua es incorrecta.');
          this.isButtonDisabled = false;
          return;
        }
      } catch (error) {
        console.error('Error al verificar la contraseña antigua:', error);
        this.isButtonDisabled = false;
        return;
      }
    }
  
    // Si se ingresa una imagen nueva, primero actualiza la imagen
    if (this.selectedFile) {
      this.perfilService.updateProfileImage(email, this.selectedFile).subscribe(
        (response) => {
          console.log('Imagen actualizada:', response);
          this.updateOtherProfileData(email);
        },
        (error) => {
          console.error('Error al actualizar la imagen:', error);
          this.isButtonDisabled = false;
        }
      );
    } else {
      this.updateOtherProfileData(email);
    }
  }
  


  updateOtherProfileData(email: string) {
    const profileData = this.profileForm.value;

    // Si no se ingresa la contraseña antigua, eliminar los campos de contraseña
    if (!profileData.old_password) {
      delete profileData.password;
      delete profileData.old_password;
    }

    this.perfilService.updateProfileData(email, profileData).subscribe(
      (response) => {
        console.log('Datos del perfil actualizados:', response);
        this.successMessage = 'Los cambios se guardaron con éxito.';
        this.isButtonDisabled = false;
      },
      (error) => {
        console.error('Error al actualizar los datos del perfil:', error);
        this.successMessage = 'La contraseña es incorrecta.';
        this.isButtonDisabled = false;
      }
    );
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.profileForm.markAsDirty(); 
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('upload-photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
