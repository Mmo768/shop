import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  Error!:string;
  isLoading:boolean = false;
  sub:Subscription = new Subscription();

  constructor(private _AuthService:AuthService , private _Router:Router,private _Title:Title){
    _Title.setTitle('Register');
  }




  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required , Validators.email]),
    password: new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z]\w{2,}\w{3,}/)]),
    rePassword: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required , Validators.pattern(/^01[0125]\w{8}$/)])
},{validators:this.customPassword});


customPassword(registerForm:any){
  let password = registerForm.get('password');
  let rePassword = registerForm.get('rePassword');
  if(password?.value !== rePassword?.value){
    rePassword.setErrors({math:'math'});
    return {math:'math'};
  }else{
    return null;
  }
}




onSubmit(registerForm:FormGroup){
  this.isLoading = true;
  this.sub.add(  this._AuthService.signUp(registerForm.value).subscribe({
    next:(reponse)=>{
      if(reponse.message == "success"){
        this._Router.navigate(['/LogIn']);
        this.isLoading = false;
      }
      
    },
    error:(err)=>{
      this.Error = err.error.message;
      this.isLoading = false;
      
    }
  }));

}


    //========= start on destroy ==========
    ngOnDestroy(){
      this.sub.unsubscribe();
  
    }






}
