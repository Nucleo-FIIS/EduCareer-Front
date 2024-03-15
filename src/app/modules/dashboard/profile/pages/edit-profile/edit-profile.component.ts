import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  isButtonDisabled = true;
  emailDisabled = true;
  isTooltipShown: boolean = false;

  constructor( private elementRef: ElementRef ) {}

  ngOnInit(): void {
    this.observeDisabledAttributeChanges();
  }

  observeDisabledAttributeChanges() {
    const inputs: NodeListOf<HTMLInputElement> = this.elementRef.nativeElement.querySelectorAll('input');
    
    inputs.forEach((input: HTMLInputElement) => { // Especifica el tipo de 'input'
      const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
            const isDisabled = input.disabled;
            console.log('isButtonDisabled: ', isDisabled);
            this.isButtonDisabled = isDisabled;

            if (!isDisabled) {
              input.setAttribute('disabled', 'true');
            }
          }
        }
      });

      observer.observe(input, { attributes: true });
    });
  }

  toggleTooltip(show: boolean) {
    this.isTooltipShown = show;
  }
}
