import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { LoadService } from 'src/app/services/load.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  dataCart:any;
  urlCash:any;
  arrayOfAdd:any[] = [];
  checkOutBool:boolean = false;
  sub:Subscription = new Subscription();
  

  constructor(private _CartService:CartService,private _LoadService:LoadService,private _Title:Title){
    _Title.setTitle('Cart');
  }

  //========== start on init ==========
  ngOnInit(){
    this._LoadService.isTrue();
    this.sub.add(    this._CartService.getProductFromCart().subscribe({
      next:(response)=>{
        this.dataCart = response;
        if(this.dataCart?.data.products.length<1){
          this.dataCart = null;
        }
        this._LoadService.isFalse();
        
      },
      error:(err)=>{
        console.log('cart > getProductFromCart' , err);
        this.dataCart = null;
        this._LoadService.isFalse();
      }
    }));
  }


  //========== start update count ==========
  update(id:any , count:number){
    this.arrayOfAdd.push(id);
    this.sub.add(    this._CartService.updateProductFromCart(id,count).subscribe({
      next:(response)=>{
        this.dataCart = response;
        this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1);
      },
      error:(err)=>{
        console.log('cart > update' , err);
        this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1);
      }
    }));
  }

  //========= delete one cart ==========

  remove(id:any){
      //========== sweetalert2 ==========
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.arrayOfAdd.push(id);
      this.sub.add(this._CartService.deleteProductFromCart(id).subscribe({
        next:(response)=>{
          this.dataCart = response;
          this._CartService.numOfCartItems.next(response.numOfCartItems);
          this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1);
          if(this._CartService.numOfCartItems.value ==0){
  
            this.dataCart = null;
          }
        },
        error:(err)=>{
          console.log('cart > remove' , err);
          this.arrayOfAdd.splice(this.arrayOfAdd.indexOf(id),1);
        }
      }));
      
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

  }

  //========= delete All cart ==========

  deleteAll(){


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.arrayOfAdd.push('remove');
        this.sub.add(this._CartService.deleteAllProductFromCart().subscribe({
          next:(response)=>{
            this.dataCart = null;
            this._CartService.numOfCartItems.next(0);
            this.arrayOfAdd.splice(this.arrayOfAdd.indexOf('remove'),1);
    
          },
          error:(err)=>{
            console.log('cart > remove' , err);
            this.arrayOfAdd.splice(this.arrayOfAdd.indexOf('remove'),1);
          }
        }));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

  //========== check out ==========

  checkForm:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  });


  urlDirect(url:any){
    window.location.href = url;
  }

  checkOut(checkForm:FormGroup , id:any){
    console.log(checkForm.value , id);
    this.checkOutBool = true;
    this.sub.add(    this._CartService.chechkOutFunc(checkForm.value,id).subscribe({
      next:(response)=>{
        this.urlCash = response;
        this.urlDirect(this.urlCash.session.url);
        this.checkOutBool = false;
        
      },
      error:(err)=>{
        console.log('cart > check out',err);
        this.checkOutBool = false;
      }}));

  }



      //========= start on destroy ==========
      ngOnDestroy(){
        this.sub.unsubscribe();
    
      }






}
