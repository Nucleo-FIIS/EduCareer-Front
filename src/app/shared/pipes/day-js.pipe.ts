import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);

@Pipe({
  name: 'dayJs'
})
export class DayJsPipe implements PipeTransform {

  transform(value: string, method: 'fromNow' | 'toNow', withoutSuffix: boolean = false): string {
    switch (method) {
      case 'fromNow':
        return dayjs(value).locale('es').fromNow(withoutSuffix);
      case 'toNow':
        return dayjs(value).locale('es').toNow(withoutSuffix);
      default:
        return '';
    }
  }

}
