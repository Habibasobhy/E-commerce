import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }


  // method to get products from api
  getProducts(): Observable<any>{
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/products");
  }


  // method to get productsDetails By id from api
  getProductsById(id:string): Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
}
