import { Component, OnInit } from '@angular/core';
import { CartService } from '../Shared/Services/cart-service/cart.service';
import { Cart } from './interfaces/cart';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  isCartEmpty : boolean = false;

  cartDetails : Cart = {} as Cart

  constructor(private _cartService: CartService,
    private _router : Router,
    private _toastrService: ToastrService){}

  ngOnInit(): void {
      this.getCart();
  }
  

  getCart(){
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);

        // to show cart Details in html after data return from api
        this.cartDetails = res;
        console.log(this.cartDetails);

        this.isCartEmpty = false;
      },
      error : (err) => {
        console.log(err);
        this.isCartEmpty = true;
      }
    })
  }


  updateCount(count:number, id:string){
    // lw al count > 0 lw al user mince aw add mn al item yklm al api 
    if(count>0){
      this._cartService.updateProductCount(count,id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
      }
    })
    }
    else{
      // lw al count b2a < 0 y call deleteItem method
      this.deleteItem(id);
    }
    
  }


  deleteItem(id:string){
    this._cartService.deleteProduct(id).subscribe({
      next: (res) => {

        // lmma a remove item  from cart count on icon of cart in ui y change
        this._cartService.cartNumber.next(res.numOfCartItems);

        console.log(res);
        this.cartDetails = res;

        // to show toastr after remove product from cart
        this._toastrService.success("Product removed successfully to your cart");
      }
    })
  }


  // ^Method to clear Cart^ //

  clearCart(){
    this._cartService.clearCart().subscribe({
      next : (res) => {
        console.log(res);
        this.cartDetails = res;


        // ^Reset value of cartNumber after clearCart^//
        this._cartService.cartNumber.next(0);

        // ^ route to home after cart become empty
        this._router.navigate(['/home'])
      }
    })
  }
}
