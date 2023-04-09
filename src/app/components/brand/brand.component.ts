import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { LoadService } from 'src/app/services/load.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

  dataBrand!:any;
  sub:Subscription = new Subscription();

  constructor(private _DataService:DataService , private _AuthService:AuthService , private _CartService:CartService , private _Router:Router,private _LoadService:LoadService){}

  ngOnInit(){
    this.getData(1);
  }


  getData(page:number){
    this._LoadService.isTrue();

    this.sub.add(    this._DataService.getBrand(page).subscribe({
      next:(response)=>{
        this.dataBrand = response;
        this._LoadService.isFalse();
      },
      error:(err)=>{
        console.log('brand > on init' , err);
        
      }
    }));
  }

  //========= start on destroy ==========
  ngOnDestroy(){
    this.sub.unsubscribe();

  }
  


}
