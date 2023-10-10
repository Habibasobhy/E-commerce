import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // contain cartNumber from backend
  // cartNumber : number = 10;
  cartNumber : BehaviorSubject <number> = new BehaviorSubject(0)  // 0 initial value

  constructor(private _httpClient : HttpClient) { }

  // ^ method to add product to cart 
  addProductToCart(id:string) : Observable <any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{
      productId : id
    }
    // ,
    // {
    //   headers : {
    //     token : `${localStorage.getItem("userToken")}`
    //   }
    // }
    )
  }


  // ^ Method to show products in a cart
  getCart() : Observable <any>{
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/cart'
    // ,
    // {
    //   headers : {
    //     token : `${localStorage.getItem("userToken")}`
    //   }
    // }
    )
  }


  // ^ Method to update product count in a cart
  updateProductCount(count:number , id : string) : Observable <any>{
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      // 3l4an ana 7atta al count x al interface number w hwa mstny al count string
      count : `${count}`
    }
    // ,
    // {
    //   headers : {
    //     token : `${localStorage.getItem("userToken")}`
    //   }
    // }
    )
  }

  
  // ^ Method to delete product from a cart 
  deleteProduct(id : string) : Observable <any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
    // ,
    // {
    //   headers : {
    //     token : `${localStorage.getItem("userToken")}`
    //   }
    // }
    )
  }


  // ^Method to get onlinePayment from api
  generateOnlinePayment(cartId : string , shippingAddress : any) : Observable <any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      // shippingAddress (left) this is name in backend , (right) this var => any
      shippingAddress : shippingAddress
    }
    // ,
    // {
    //   headers : {
    //     token : `${localStorage.getItem("userToken")}`
    //   }
    // }
    )
  }

  // ^Method to get cashPayment from api
  generateCashPayment(cartId : string , shippingAddress : any) : Observable <any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      shippingAddress : shippingAddress
    })
  }

  // ^ method to clear cart from api
  clearCart() : Observable <any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`
    // ,
    // {
    //   headers : {
    //     token : `${localStorage.getItem("userToken")}`
    //   }
    // }
    )
  }
  
}
