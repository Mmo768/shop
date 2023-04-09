import { Component } from '@angular/core';
import { LoadService } from 'src/app/services/load.service';


@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent {

  isLoading:boolean = false;

  constructor(private _LoadService:LoadService){}

  ngOnInit(){

    this._LoadService.loading.subscribe((x)=>{
      this.isLoading = x;
    });
  }




}
