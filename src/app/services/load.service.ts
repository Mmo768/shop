import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadService {

  loading:BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  isFalse(){
    this.loading.next(false);
  }

  isTrue(){
    this.loading.next(true);
  }


}
