import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  Error!:string;
  isLoading:boolean = false;


  constructor(private _AuthService:AuthService , private _Router:Router,private _CartService:CartService){}




  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required , Validators.email]),
    password: new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z]\w{2,}\w{3,}/)]),
});



onSubmit(loginForm:FormGroup){
  this.isLoading = true;
  this._AuthService.signIn(loginForm.value).subscribe({
    next:(reponse)=>{
      if(reponse.message == "success"){
        localStorage.setItem('userToken' , reponse.token);
        this._AuthService.getLocalToken();
        this._CartService.getCartOwner();
        this._Router.navigate(['/Home']);
        this.isLoading = false;
      }
      
    },
    error:(err)=>{
      this.Error = err.error.message;
      this.isLoading = false;
      
    }
  })

}







}
