import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient:HttpClient) { }

  getCategoriesCarousel():Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl + 'api/v1/categories');
  }


  getproducts(page:number):Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl + 'api/v1/products?page='+page);
  }


  getproductdetails(id:any):Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl + 'api/v1/products/'+ id);
  }


  getBrand(page:number):Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl + 'api/v1/brands?page='+ page);
  }


  getBrandProduct(BrandId:any , page:number):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/products?brand=${BrandId}&page=${page}`);
  }


  getsubCategories(CategoriesId:any):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/categories/${CategoriesId}/subcategories`);
  }


  getCategoriesProducts(id:any):Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl + 'api/v1/products?category[in]='+id);
  }







}
