import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient : HttpClient) { }

   // method to get categories from api
   getCategories(): Observable<any>{
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/categories");
  }


  // Method to get subCategories
  getSubCategories(id : string) : Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }
}

