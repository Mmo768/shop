import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { LoadService } from 'src/app/services/load.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  dataCategoriesCarousel!:any;
  dataSubCategories!:any;
  dataCategories!:any;
  arrayOfAdd:any = [];

  constructor(private _DataService:DataService , private _AuthService:AuthService , private _CartService:CartService , private _Router:Router,private _LoadService:LoadService){}


  ngOnInit(){
    this._LoadService.isTrue();
    this._DataService.getCategoriesCarousel().subscribe({
      next:(response)=>{
        this.dataCategoriesCarousel = response;
        this._LoadService.isFalse();
      },
      error:(err)=>{
        console.log('categoriesCarousel',err);
      }
    });


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

    // ========= start word og subCategories =========
    subcategories(id:any){
      this._DataService.getsubCategories(id).subscribe({
        next:(response)=>{
          this.dataSubCategories = response.data;
        },
        error:(err)=>{
          console.log('categories > subCategories' , err);
          
        }
      })

      this._DataService.getCategoriesProducts(id).subscribe({
        next:(response)=>{
          this.dataCategories = response;
        },
        error:(err)=>{
          console.log('categories > subcategories' , err);
          
        }
      })
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
