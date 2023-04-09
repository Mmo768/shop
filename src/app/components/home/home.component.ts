import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { LoadService } from 'src/app/services/load.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  dataCategoriesCarousel!:any;
  dataProducts:any;
  wordSearch:string = '';
  arrayOfAdd:any[] = [];

  

  constructor(private _DataService:DataService , private _AuthService:AuthService,private _CartService:CartService , private _Router:Router , private _LoadService:LoadService){}

// ========= start on init =========
  ngOnInit(){

    this._LoadService.isTrue();
    this._DataService.getCategoriesCarousel().subscribe({
      next:(response)=>{
        this.dataCategoriesCarousel = response;
      },
      error:(err)=>{
        console.log('categoriesCarousel',err);
      }
    });


    this._DataService.getproducts(1).subscribe({
      next:(response)=>{
        this.dataProducts = response;
        this._LoadService.isFalse();
      },
      error:(err)=>{
        console.log('dataProducts',err);
      }
    });
    


  }



  // ========= start header carousel =========
  headerCarsel: OwlOptions = {
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
  // ========= start categories carousel =========
  categoriesCarousel: OwlOptions = {
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
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
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




  

}
