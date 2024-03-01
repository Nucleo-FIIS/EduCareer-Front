import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignUpMode: boolean = false;
  emailLogin: string = '';
  passwordLogin: string = '';

  constructor(private formBuilder: FormBuilder, private authService:AuthService) {
  }

  formLogin = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-À-ÿ]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    'password': ['', [Validators.required, this.customPasswordValidator]],
  });

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    // Verificar si la contraseña contiene caracteres no permitidos
    if (!/^[a-zA-Z0-9À-ÿ]+$/.test(value)) {
      return { invalidCharacters: true };
    }

    if (value.length >= 1 && value.length <= 5) {
      return { length: 'short' };
    }

    if (value.length >= 6 && value.length <= 10) {
      return { length: 'medium' };
    }

    return null; // Password is valid
  }

  get email() {
    return this.formLogin.get('email') as FormControl;
  }

  get password() {
    return this.formLogin.get('password') as FormControl;
  }


  @ViewChildren('bullets') bullets!: QueryList<ElementRef<HTMLSpanElement>>;

  onInputFocus(input: HTMLInputElement): void {
    input.classList.add('active');
  }

  onInputBlur(input: HTMLInputElement): void {
    if (!input.value.trim()) {
      input.classList.remove('active');
    }
  }

  moveSlider(index: number): void {
    const bullets = document.querySelectorAll('.bullet');
    bullets.forEach((bullet) => bullet.classList.remove('active'));
    bullets[index - 1].classList.add('active');
  
    const images = document.querySelectorAll('.image');
    images.forEach((img) => img.classList.remove('show'));
    images[index - 1].classList.add('show');
  
    const textSlider = document.querySelector('.text-group');
    if (textSlider) {
      textSlider.setAttribute('style', `transform: translateY(${-((index - 1) * 2.2)}rem)`);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.bullets.forEach((bullet, index) => {
        bullet.nativeElement.addEventListener('click', () => this.moveSlider(index + 1));
      });
  
      this.startAutoSlider();
    }, 2000); // Se puede ajustar este tiempo según sea necesario
  }
  
  startAutoSlider(): void {
    setInterval(() => {
      const bullets = document.querySelectorAll('.bullet');
      const activeBullet = document.querySelector('.bullet.active');
  
      if (activeBullet !== null) {
        let currentIndex = Array.from(bullets).indexOf(activeBullet);
  
        if (currentIndex !== -1) {
          currentIndex = (currentIndex + 1) % bullets.length;
          this.moveSlider(currentIndex + 1);
        }
      }
    }, 5000); // Cambia aquí el tiempo en milisegundos para ajustar la velocidad del slider
  }

  resetStyles(): void {
    // Selecciona todos los elementos .input-field con la clase .active dentro de .input-wrap
    const inputFields = document.querySelectorAll('.input-wrap .input-field.active');
  
    // Itera sobre cada elemento y restablece los estilos
    inputFields.forEach((inputField: Element) => {
      const elem = inputField as HTMLElement;
      elem.classList.remove('active');
      elem.classList.add('initial-style');
  
      // Restablece los estilos de la etiqueta asociada al input-field
      const label = elem.nextElementSibling as HTMLElement;
      if (label) {
        label.classList.remove('active');
        label.classList.add('initial-style');
      }
    });
  }
  

  submitForm(): void {
    // Aquí puedes enviar los datos del formulario si es necesario
    this.authService.login(this.formLogin.value).subscribe(resp=>{
      console.log("data recibida:",resp)
    });
    console.log('Formulario enviado');
    console.log(this.formLogin.value);

    // Restablecer estilos
    this.resetStyles();

    // Reestablecer los valores del formulario
    this.formLogin.reset();
  }
}
