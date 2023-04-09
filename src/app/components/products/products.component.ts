import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { LoadService } from 'src/app/services/load.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  dataProducts:any;
  arrayOfAdd:any[] = [];
  sub:Subscription = new Subscription();

  

  constructor(private _DataService:DataService , private _AuthService:AuthService , private _CartService:CartService , private _Router:Router,private _LoadService:LoadService){}

// ========= start on init =========
  ngOnInit(){
    this.getData(1)

  }

//========== start function ==========
getData(page:number){
  this._LoadService.isTrue();

  this.sub.add(  this._DataService.getproducts(page).subscribe({
    next:(response)=>{
      this.dataProducts = response;
      this._LoadService.isFalse();
    },
    error:(err)=>{
      console.log('dataProducts',err);
    }
  }));

}



  //========= start add products ==========
  addProduct(id:any){
    if(this._AuthService.token.value != null){
      this.arrayOfAdd.push(id);
      this._CartService.addProductToCart(id).subscribe({
        next:(response)=>{
          //////////////////////////////sucess add
          this._CartService.numOfCartItems.next(response.numOfCartItems);
          this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1);
          
          
        },
        error:(err)=>{
          console.log('details>addpriducts' , err);
          this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1)
          
        }
      })
    }else{
      this._Router.navigate(['/LogIn']);
    }

  }


  //========= start on destroy ==========

  ngOnDestroy(){
    this.sub.unsubscribe();
  }



}
