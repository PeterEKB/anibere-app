import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayFromNumberPipe implements PipeTransform {

  transform(value: number): Array<any> {
    return Array(value);
  }

}
