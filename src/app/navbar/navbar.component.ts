import { CartService } from '../Shared/Services/cart-service/cart.service';
import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  cartCount:number = 0;

  constructor(private _authService: AuthService , 
    private _cartService : CartService) {

    // res is the change that will happen on userData
    this._authService.userData.subscribe((res) => {
      // if userData notEmpty ==> user loggedIn
      if (this._authService.userData.getValue()) {
        this.isLoggedIn = true;
      }
      // when userData Empty ==> user not loggedIn
      else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
    // ay 7aga tt8iar x al cartNumber al gwa al subscribe hy4t8l mn awl w gdeed
      this._cartService.cartNumber.subscribe({
        // res al value ally x al behavior subject
        next : (res) => {

          // cartCount = res => countNumber
          this.cartCount = res;
          
        }
      });



      // awl al site myft7 al nav tro7 tklm al getCart 3l4an feeha kol al data ally x al cart 
      // w 3l4an lw 3mlt refresh al count ally 3la icon al cart htb2a b 0 7atta lw al cart feha products 
      this._cartService.getCart().subscribe({
        next: (res) => {
          console.log(res);
          this._cartService.cartNumber.next(res.numOfCartItems)
        }
      })
    }

  // when user clicked on logout go to logOut method in auth service
  logOut(){
    this._authService.logOut();
  }
}
