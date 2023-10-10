import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // property to show on all components ==> lmma y7sl feeh ay change ysm3 x ba2y al components 
  wishlistData : string[] = [];

  constructor(private _httpClient : HttpClient) { }


  
  // & Add products to WishList & //
  addProductToWishlist(productId : string) : Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      productId
    })
  }

  getWishlist() : Observable<any>{
     return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }

  removeProductFromWishlist(id : string) : Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }
}
