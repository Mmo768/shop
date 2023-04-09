import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandProductComponent } from './components/brand-product/brand-product.component';
import { DetailsComponent } from './components/details/details.component';
import { ErrorComponent } from './components/error/error.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandComponent } from './components/brand/brand.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/not-auth.guard';

const routes: Routes = [
  {path:'' , redirectTo:'Home' , pathMatch:'full'},
  {path:'Home' , component:HomeComponent},
  {path:'Product' , component:ProductsComponent},
  {path:'Details' , component:DetailsComponent},
  {path:'categories' , component:CategoriesComponent},
  {path:'Brands' , component:BrandComponent},
  {path:'BrandProducts' , component:BrandProductComponent},
  {path:'Cart' , canActivate:[AuthGuard] , component:CartComponent},
  {path:'Order' , canActivate:[AuthGuard] , component:OrderComponent},
  {path:'allorders' , redirectTo:'Order'},
  {path:'Register' , canActivate:[NotAuthGuard] , component:RegisterComponent},
  {path:'LogIn' , canActivate:[NotAuthGuard] , component:LoginComponent},
  {path:'**' , component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
