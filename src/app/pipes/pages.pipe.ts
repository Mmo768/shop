import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pages'
})
export class PagesPipe implements PipeTransform {

  transform(value: number) {

    let arrOfPage = [];

    for(let i =1 ; i<= value ; i++){
      arrOfPage.push(i);
    }
    return arrOfPage;
  }

}
