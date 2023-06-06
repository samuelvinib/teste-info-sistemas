import { Pipe, PipeTransform } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Pipe({
  name: 'chassi'
})
export class ChassiPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      value = value.toUpperCase();
      value = value.replace(/[^a-zA-Z0-9]/g, '');

      if (value.length > 17) {
        value = value.substring(0, 17);
      }

      if (value.length > 8) {
        value = value.replace(/(\w{3})(\w+)/, '$1 $2');
      }

      if (value.length > 4) {
        value = value.replace(/(\w{3})(\w{2})(\w+)/, '$1 $2 $3');
      }
    }

    return value;
  }
}

@Directive({
  selector: '[appChassi]'
})
export class ChassiDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    const formattedValue = value.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');

    if (formattedValue.length > 17) {
      event.target.value = formattedValue.substring(0, 17);
    } else {
      event.target.value = formattedValue;
    }
  }
}
