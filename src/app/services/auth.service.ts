import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) {
    this.getLocalToken();
   }

  signUp(siginUpValue:any):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl+'api/v1/auth/signup' , siginUpValue);
  }


  signIn(siginInValue:any):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl+'api/v1/auth/signin' , siginInValue);
  }


  getLocalToken(){
    let token = localStorage.getItem('userToken');
    if(token != null){
      this.token.next(token);
    }else{
      this.token.next(null);
    }
  }




}
