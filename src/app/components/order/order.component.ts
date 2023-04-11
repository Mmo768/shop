import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoadService } from 'src/app/services/load.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  dataOrder:any;
  sub:Subscription = new Subscription();

  constructor(private _CartService:CartService,private _LoadService:LoadService,private _Title:Title){
    _Title.setTitle('Order');
  }

  ngOnInit(){
    this._LoadService.isTrue();
    this.sub.add(    this._CartService.cartOwner.subscribe((x)=>{
      if(x!=null){
        
        this._CartService.getUserOrder(x).subscribe({
          next:(response)=>{
            this.dataOrder = response;
            this._LoadService.isFalse();
          },
          error:(err)=>{
            console.log('order > onInit' , err);
            
          }})
      }}));



  }


    //========= start on destroy ==========
    ngOnDestroy(){
      this.sub.unsubscribe();
  
    }

}
