import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandComponent } from './components/brand/brand.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { BrandProductComponent } from './components/brand-product/brand-product.component';
import { TitleCutPipe } from './pipes/title-cut.pipe';
import { SeachPipe } from './pipes/seach.pipe';
import { PagesPipe } from './pipes/pages.pipe';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoadComponent } from './components/load/load.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatePipe } from './pipes/date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandComponent,
    CartComponent,
    OrderComponent,
    RegisterComponent,
    LoginComponent,
    DetailsComponent,
    BrandProductComponent,
    TitleCutPipe,
    SeachPipe,
    PagesPipe,
    ErrorComponent,
    LoadComponent,
    FooterComponent,
    DatePipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
