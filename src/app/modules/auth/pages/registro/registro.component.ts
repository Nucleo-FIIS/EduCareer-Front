import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  isSignUpMode: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  formRegister = this.formBuilder.group({
    'fullName': ['', [Validators.required, this.customNameValidator]],
    'email': ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-À-ÿ]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    'password': ['', [Validators.required, this.customPasswordValidator]],
    'gender': ['', Validators.required],
    'career': ['', Validators.required]
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

  customNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
  
    if (!value) {
      return { required: true };
    }
  
    // Verificar si el nombre contiene caracteres no permitidos
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      return { invalidCharacters: true };
    }
  
    // Validar la longitud del nombre
    if (value.length <= 5) {
      return { length: 'short' };
    }
  
    return null; // Nombre válido
  }

  get fullName() {
    return this.formRegister.get('fullName') as FormControl;
  }

  get email() {
    return this.formRegister.get('email') as FormControl;
  }

  get password() {
    return this.formRegister.get('password') as FormControl;
  }

  activeMenu: 'gender' | 'career' | null = null;


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

  toggleOptions(menu: 'gender' | 'career'): void {
    if (this.activeMenu === menu) {
      this.activeMenu = null;  // Cerrar el menú actual si se hace clic en él nuevamente
    } else {
      this.activeMenu = menu;  // Activar el menú si no está activo
    }
  }

  selectedGender: string | null = null;
  selectedCareer: string | null = null;

  selectOption(menu: 'gender' | 'career', option: string): void {
    if (menu === 'gender') {
      this.selectedGender = option;
      this.formRegister.patchValue({ gender: option });
    } else {
      this.selectedCareer = option;
      this.formRegister.patchValue({ career: option });
    }
    this.activeMenu = null;  // Cerrar el menú desplegable
  }  

  isOptionSelected(menu: 'gender' | 'career', option: string): boolean {
    return menu === 'gender' ? this.selectedGender === option : this.selectedCareer === option;
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
    console.log('Formulario enviado');
    console.log(this.formRegister.value);

    // Restablecer estilos
    this.resetStyles();

    // Reestablecer el formulario
    this.formRegister.reset();

    // Resetear valores de las variables
    this.selectedGender = null;
    this.selectedCareer = null;
  }
}
