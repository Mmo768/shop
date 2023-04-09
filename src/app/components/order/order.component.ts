import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoadService } from 'src/app/services/load.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  dataOrder:any;

  constructor(private _CartService:CartService,private _LoadService:LoadService){}

  ngOnInit(){
    this._LoadService.isTrue();
    this._CartService.cartOwner.subscribe((x)=>{
      if(x!=null){
        
        this._CartService.getUserOrder(x).subscribe({
          next:(response)=>{
            this.dataOrder = response;
            this._LoadService.isFalse();
          },
          error:(err)=>{
            console.log('order > onInit' , err);
            
          }})
      }})



  }




}
