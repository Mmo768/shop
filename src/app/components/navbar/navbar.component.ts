import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogin:boolean = false;
  numOfCartItems:number = 0;

  constructor(private _AuthService:AuthService , private _Router:Router , private _CartService:CartService){}

  ngOnInit(){

    this._AuthService.token.subscribe({
      next:(x)=>{
        if(x != null){
          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
      }
    });

    this._CartService.numOfCartItems.subscribe((x)=>{
      this.numOfCartItems = x;
    })

  }


  logOut(){
    localStorage.removeItem('userToken');
    this._AuthService.getLocalToken();
    this._CartService.cartOwner.next(null);
    this._CartService.numOfCartItems.next(0);
    this._Router.navigate(['/LogIn']);
  }



}
