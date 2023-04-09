import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seach'
})
export class SeachPipe implements PipeTransform {

  transform(value: any[], word: string): any[] {

    return value?.filter((x)=>{
      return x.title.toLowerCase().includes(word.toLowerCase());
    });
  }

}
