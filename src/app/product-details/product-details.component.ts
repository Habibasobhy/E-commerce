import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Shared/Services/products-service/products.service';
import { Product } from '../Shared/Interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../Shared/Services/cart-service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../Shared/Services/wishlist-service/wishlist.service';
import { Wishlist } from '../wishlist/interfaces/wishlist';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit{
  productId: string = '';
  productDetails: Product = {} as Product;
  allWishlistData : string[] = []

  //& Owl Carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  //ActivatedRoute to listen any change in url
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _toastrService  : ToastrService,
    private _wishlistService : WishlistService
  ) {
    
  }

  ngOnInit(): void {
    this.getParamsId();

    this._wishlistService.getWishlist().subscribe({
      next : (res) => {
        // console.log("wishlist from productItem",res.data);

        const newWishlistData = res.data.map((item:any) => item._id);

        // console.log("newWishlistData",newWishlistData);

        this.allWishlistData = newWishlistData;
      }
    })
  }
  

  getParamsId(){
    this._activatedRoute.paramMap.subscribe((res: any) => {
      console.log(res.params.id);
      this.productId = res.params.id; // to carry id to send it to api to show details of product

      // send id to api and show data of product for this id
      this._productsService.getProductsById(this.productId).subscribe({
        next: (res) => {
          console.log(res);

          // productDetails carry data for this id
          this.productDetails = res.data;
        },
      });
    });
  }

  // method to add product to cart when user clicked on button
  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        // put numOfCartItems back from backend in cartNumber
        this._cartService.cartNumber.next(res.numOfCartItems);

        // to show toastr after add product to cart
        this._toastrService.success(res.message);
      },
    });
  }


  addProductToWishlist(id : string){
    this._wishlistService.addProductToWishlist(id).subscribe({
      next : (res) => {
        console.log(res);

        this._wishlistService.wishlistData = res.data;
        this.allWishlistData = this._wishlistService.wishlistData;

        // to show toastr after add product to wishList
        this._toastrService.success(res.message);
      }
    })
  }

     // & remove products from WishList & //
     removeItemFromWishlist(id : string) {
      this._wishlistService.removeProductFromWishlist(id).subscribe({
        next : (res) => {
          console.log(res);
  
          this._wishlistService.wishlistData = res.data;
          this.allWishlistData = this._wishlistService.wishlistData;
          
          // to show toastr after remove product from wishlist
          this._toastrService.success(res.message); 
        }
      })
    }
}
