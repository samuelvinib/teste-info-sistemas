import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Placa'
})
export class PlacaPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.replace(/\D/g, '');
      
      if (value.length > 7) {
        value = value.substring(0, 7);
      }

      // Apply specific formatting for the Placa field
      value = value.replace(/(\w{3})(\w{4})/, '$1-$2');
    }
    return value;
  }
}
