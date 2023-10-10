import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../Shared/Services/wishlist-service/wishlist.service';
import { Wishlist } from './interfaces/wishlist';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../Shared/Services/cart-service/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allWishlist : Wishlist = {} as Wishlist;


  constructor(private _wishlistService : WishlistService,
    private _toastrService: ToastrService,
    private _cartService : CartService){ }

  ngOnInit(): void {
      this.getWishList();
  }


  getWishList(){
    this._wishlistService.getWishlist().subscribe({
      next : (res) => {
        console.log(res);

        // To show data in html
        this.allWishlist = res;
      }
    })
  }

  removeItemFromWishlist(id : string){
    this._wishlistService.removeProductFromWishlist(id).subscribe({
      next : (res) => {
        console.log(res);

        // remove item in api not supported in api ==> after remove product calling this method to update the data in html and show them 
        this.getWishList();

        // to show toastr after remove product from wishlist
        this._toastrService.success(res.message);
      }
    })
  }

  addProductToCart(id : string){
    this._cartService.addProductToCart(id).subscribe({
      next : (res) => {
        console.log(res);

        // to show toastr after add product to cart
        this._toastrService.success(res.message);
      }
    })
  }
}
