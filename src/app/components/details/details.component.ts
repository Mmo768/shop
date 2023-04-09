import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { LoadService } from 'src/app/services/load.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  dataDetails:any;
  productId:any;
  clickBtn:boolean = false;
  sub:Subscription = new Subscription();


  constructor(private _DataService:DataService , private _ActivatedRoute:ActivatedRoute,private _CartService:CartService , private _AuthService:AuthService , private _Router:Router,private _LoadService:LoadService){}

  //========== start on init =========
  ngOnInit(){

    this._LoadService.isTrue();
    this._ActivatedRoute.queryParamMap.subscribe({
      next:(response)=>{
        this.productId = response;
      }
    })

    this.sub.add(this._DataService.getproductdetails(this.productId.params.id).subscribe({
      next:(response)=>{
        this.dataDetails = response;
        this._LoadService.isFalse();
        
      },
      error:(err)=>{
        console.log('detailsProduct'  , err);
        
      }
    }));

  }


  //========== start img owl carousel ==========
  imgDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  //========= start add products ==========
  addProduct(id:any){

    if(this._AuthService.token.value != null){
      this.clickBtn = true;
      this.sub.add( this._CartService.addProductToCart(id).subscribe({
        next:(response)=>{
          //////////////////////////////sucess add
          this._CartService.numOfCartItems.next(response.numOfCartItems);
          this.clickBtn = false;
          
        },
        error:(err)=>{
          console.log('details>addpriducts' , err);
          this.clickBtn = false;
          
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
