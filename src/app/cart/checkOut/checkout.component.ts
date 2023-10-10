import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart-service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  shippingAddress : FormGroup = new FormGroup({
    details : new FormControl(null),
    phone : new FormControl(null),
    city : new FormControl(null)
  });

  cartId : string = '';

  constructor(private _cartService: CartService,
    private _activatedRoute : ActivatedRoute,
    private _router : Router) {
      this._activatedRoute.paramMap.subscribe(
        (res:any) => {
          //  res.params.cartId ==== cartId this is name in routing in url
          this.cartId = res.params.cartId
          console.log(this.cartId);
          
        }
      )
  }

  // ^ payment by Online method
  handleOnline(){
    console.log(this.shippingAddress);


    this._cartService.generateOnlinePayment(this.cartId,this.shippingAddress.value).subscribe({
      next: (res) => {
        console.log(res);

        if(res.status == "success"){
            // to get url of online payment
            console.log(res.session.url);

            // to go to url of online payment
            window.location.href = res.session.url;
        }
      },
      error: (err)=>{
        console.log("error here",err);
        
      }
    })
  }

    // ^ payment by Cash method
  handleCash(){
    console.log(this.shippingAddress);


    this._cartService.generateCashPayment(this.cartId,this.shippingAddress.value).subscribe({
      next: (res) => {
        console.log(res);

        if(res.status == "success"){
            // To go to cashOrder component
            this._router.navigate(['/cashOrder']);
        }
      },
      error: (err)=>{
        console.log("error here",err);
        
      }
    })
  }
}
