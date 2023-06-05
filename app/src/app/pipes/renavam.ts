import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Renavam'
})
export class RenavamPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.replace(/\D/g, '');

      // Apply specific formatting for the Renavam field
      // Example: Add dots after every 3 characters
      value = value.replace(/(.{3})/g, '$1.');
    }
    return value;
  }
}
