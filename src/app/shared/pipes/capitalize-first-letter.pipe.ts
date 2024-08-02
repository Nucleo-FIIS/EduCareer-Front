import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; // Maneja el caso en que el valor sea nulo o indefinido
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
