import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Shared/Interfaces/product';
import { CartService } from '../Shared/Services/cart-service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../Shared/Services/wishlist-service/wishlist.service';
import { Wishlist } from '../wishlist/interfaces/wishlist';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit{
  @Input() product: Product = {} as Product;
  allWishlistData: string[] = [];  // == array of id ['id','id,....]

  constructor(
    private _cartService: CartService,
    private _toastrService: ToastrService,
    private _wishlistService : WishlistService
  ) {}

  ngOnInit(): void {

    // awl m al productItem Component yft7 hyroo7 yklm al wishlist service w ygeeb al wishlist bta3t al user
      this._wishlistService.getWishlist().subscribe({
        next : (res) => {
          // console.log("wishlist from productItem",res.data);  //^ data 3bara 3n array of obj w kol obj feeh id [{id}, {id}, {id}]

          //^ 3l4an arg3 al data array od id 3ltool using map 3l4an al allWishlistData hya array of id

          //^ b loop 3la al data w b return al item._id ally hwa ['id','id',..]
          //^ item hwa obj ba5od mn gwah al id

          const newWishlistData = res.data.map((item:any) => item._id);

          // console.log("newWishlistData",newWishlistData);

          this.allWishlistData = newWishlistData;
          
        }
      })
  }

  // & Add products to Cart & //
  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (response) => {
        console.log(response);

        // put numOfCartItems back from backend in cartNumber
        this._cartService.cartNumber.next(response.numOfCartItems);

        // no of products in a cart
        console.log(this._cartService.cartNumber);

        // to show toastr after add product to cart
        this._toastrService.success(response.message);
      },
    });
  }

  
  // & Add products to WishList & //
  addProductToWishlist(id : string){
    this._wishlistService.addProductToWishlist(id).subscribe({
      next : (res) => {
        console.log(res);

        // to put res.data in service 3l4an lmma ad5ol 3la al details lw al user 3amel add to wishlist yban x al details w al 3ks s7ee7
        this._wishlistService.wishlistData = res.data;
        this.allWishlistData = this._wishlistService.wishlistData;
        
        // to show toastr after add product to wishlist
        this._toastrService.success(res.message);
      }
    })
  }

   // & remove products from WishList & //
  removeItemFromWishlist(id : string) {
    this._wishlistService.removeProductFromWishlist(id).subscribe({
      next : (res) => {
        console.log(res);

        // to put res.data in service 3l4an lmma ad5ol 3la al details lw al user 3amel remove product from wishlist yban x al details w al 3ks s7ee7
        this._wishlistService.wishlistData = res.data;
        this.allWishlistData = this._wishlistService.wishlistData;
        
        // to show toastr after remove product from wishlist
        this._toastrService.success(res.message); 
      }
    })
  }
}
