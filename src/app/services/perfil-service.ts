import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl = 'http://localhost:8080/api/perfil'; // Cambia la URL según tu configuración backend

  constructor(private http: HttpClient) {}

  // Método para actualizar la imagen de perfil
  updateProfileImage(email: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.baseUrl}/actualizarimagen/${email}`, formData, { responseType: 'text' });
  }

  // Método para actualizar los demás datos del perfil
  updateProfileData(email: string, profileData: any): Observable<string> {
    console.log(this.baseUrl+" "+email);
    return this.http.put(`${this.baseUrl}/actualizardatos/${email}`, profileData, { responseType: 'text' });
  }

  // Método para obtener los datos del perfil del usuario
getProfileData(email: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/buscarUsuarioPorEmail/${email}`);
}

 // Método para verificar si la contraseña antigua es correcta
 verifyOldPassword(email: string, oldPassword: string): Observable<boolean> {
  return this.http.post<boolean>(`${this.baseUrl}/verificarPassword/${email}?password=${oldPassword}`, null);
}




}
