import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCut'
})
export class TitleCutPipe implements PipeTransform {

  transform(value: string, args: number): string {
    return value.split(' ').slice(0,args).join(' ');
  }

}
