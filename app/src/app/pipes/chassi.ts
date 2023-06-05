import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Chassi'
})
export class ChassiPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      // Apply specific formatting for the Chassi field
      // Example: Add hyphens after every 4 characters
      value = value.replace(/(.{4})/g, '$1-');
    }
    return value;
  }
}
