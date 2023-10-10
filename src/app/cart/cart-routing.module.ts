import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CheckoutComponent } from './checkOut/checkout.component';

const routes: Routes = [
  {path: '', component: CartComponent , title : "cart"},
  {path : "checkout/:cartId" , component : CheckoutComponent , title : "checkout"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
