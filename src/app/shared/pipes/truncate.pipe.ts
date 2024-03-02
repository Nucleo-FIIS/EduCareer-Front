// truncate.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, maxLength: number = 50): string {
    if (!value) {
      return ''; // o algún valor predeterminado si es apropiado en tu caso
    }

    if (value.length <= maxLength) {
      return value;
    }

    return value.substr(0, maxLength) + '...';
  }
}
