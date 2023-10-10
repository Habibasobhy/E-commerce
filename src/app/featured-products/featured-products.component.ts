import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Shared/Services/products-service/products.service';
import { Product } from '../Shared/Interfaces/product';
import { CartService } from '../Shared/Services/cart-service/cart.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {
  // property to contain data that return from api  (array of object)
  // Product is Interface
  allProduct : Product[] = [];
  searchKey : string = '';

  constructor(private _productsService:ProductsService ,
    private _cartService : CartService){}

  ngOnInit(): void {

    // when logout and login from another email change no of cart
    this._cartService.getCart().subscribe({
      next:(res)=>{
        this._cartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err)=>{
        this._cartService.cartNumber.next(0);
      }
    })

    // call getAllProducts method 
      this.getAllProducts();
  }

  getAllProducts(){
    this._productsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);

        // When the data is returned ==> allProduct equal data that returned from api
        this.allProduct = res.data;
      }
    })
  }
}
