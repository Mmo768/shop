import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable , BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartOwner:BehaviorSubject<any> = new BehaviorSubject(null);
  numOfCartItems:BehaviorSubject<any> = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem('userToken') != null){
      this.getCartOwner();
    }

   }


   //========== add from cart ==========
  addProductToCart(id:any):Observable<any>
  {
        let userToken:any = localStorage.getItem('userToken');
        return this._HttpClient.post(environment.baseUrl + 'api/v1/cart',{
          "productId": id
      },{
        headers:{
          token:userToken
        }
      });
  }



  //========== get from cart ==========
  getProductFromCart():Observable<any>
  {
        let userToken:any = localStorage.getItem('userToken');
        return this._HttpClient.get(environment.baseUrl + 'api/v1/cart',{
        headers:{
          token:userToken
        }
      });
  }



  //========== update cart ==========
  updateProductFromCart(id:any , num:number):Observable<any>
  {
        let userToken:any = localStorage.getItem('userToken');
        return this._HttpClient.put(environment.baseUrl + 'api/v1/cart/'+id
        ,{
          "count": num
        },{
        headers:{
          token:userToken
        }
      });
  }



 //========== delete one product ==========
  deleteProductFromCart(id:any):Observable<any>
  {
        let userToken:any = localStorage.getItem('userToken');
        return this._HttpClient.delete(environment.baseUrl + 'api/v1/cart/'+id
        ,{
        headers:{
          token:userToken
        }
      });
  }



  //========== delete all product ==========
  deleteAllProductFromCart():Observable<any>
  {
        let userToken:any = localStorage.getItem('userToken');
        return this._HttpClient.delete(environment.baseUrl + 'api/v1/cart'
        ,{
        headers:{
          token:userToken
        }
      });
  }



  //========== get order ==========
  getUserOrder(cartOwner:any):Observable<any>
  {
        return this._HttpClient.get(environment.baseUrl + 'api/v1/orders/user/'+cartOwner);
  }


  //========== get ==========
  getCartOwner(){
    this.getProductFromCart().subscribe({
      next:(response)=>{
      this.cartOwner.next(response.data.cartOwner);
      this.numOfCartItems.next(response.numOfCartItems);
    },error:(err)=>{
      this.cartOwner.next(err.error.message.split(': ').reverse().slice(0,1).join(' '));      
      console.log('cartServices > getCartOwner' , err);
      this.numOfCartItems.next(0);
    }
  })
  }


  //========== chech Out ==========
  chechkOutFunc(value:object , id:any){
    let userToken:any = localStorage.getItem('userToken');
    return this._HttpClient.post(`${environment.baseUrl}api/v1/orders/checkout-session/${id}?url=${environment.domain}`
    ,
    {
      "shippingAddress":value
  }
    ,{
    headers:{
      token:userToken
    }
  });
  }













}
