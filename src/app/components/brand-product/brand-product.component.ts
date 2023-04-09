import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { LoadService } from 'src/app/services/load.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-brand-product',
  templateUrl: './brand-product.component.html',
  styleUrls: ['./brand-product.component.css']
})
export class BrandProductComponent {

  dataProducts:any;
  arrayOfAdd:any[] = [];
  BrandId!:any;
  sub:Subscription = new Subscription();

  

  constructor(private _DataService:DataService , private _AuthService:AuthService , private _CartService:CartService , private _Router:Router , private _ActivatedRoute:ActivatedRoute,private _LoadService:LoadService){}

// ========= start on init =========
  ngOnInit(){
    this._LoadService.isTrue();

    this.sub.add( this._ActivatedRoute.queryParamMap.subscribe((x)=>{
      this.BrandId = x;
      this.getData(this.BrandId.params.BrandId , 1);
      
    }));
    

  }

//========== start function ==========
getData(id:any ,page:number){
  
  this.sub.add(  this._DataService.getBrandProduct(id,page).subscribe({
    next:(response)=>{
      this.dataProducts = response;
      this._LoadService.isFalse();
      if(response.data.length < 1){
        this._Router.navigate(['./Brands']);
      }
      
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
      this.sub.add( this._CartService.addProductToCart(id).subscribe({
        next:(response)=>{
          //////////////////////////////sucess add
          this._CartService.numOfCartItems.next(response.numOfCartItems);
          this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1);
          
        },
        error:(err)=>{
          console.log('details>addpriducts' , err);
          this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1)
          
        }
      }));
    }else{
      this._Router.navigate(['/LogIn']);
    }

  }

    //========= start on destroy ==========
    ngOnDestroy(){
      this.sub.unsubscribe();
  
    }






}
