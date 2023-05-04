import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayFromNumberPipe implements PipeTransform {

  transform(value: number | null | string): Array<any> {
    return Array(value);
  }

}
