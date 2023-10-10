import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})

// it is function using to trim text 
// receive value and no of char
export class TrimPipe implements PipeTransform {

  transform(value: string, numberOfChar: number): string {
    return value.split(" ").slice(0,numberOfChar).join(" ");
  }
}
