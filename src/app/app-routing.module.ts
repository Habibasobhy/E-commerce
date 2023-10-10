import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './core/Guards/auth.guard';
import { authDeActivatedGuard } from './core/Guards/auth-de-activated.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BrandsComponent } from './brands/brands.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { OrderCashComponent } from './order-cash/order-cash.component';
import { SpecificBrandComponent } from './specific-brand/specific-brand.component';

const routes: Routes = [
  {path : "", redirectTo : "home", pathMatch : "full"},
  {path : "home" ,canActivate : [authGuard], component : HomeComponent , title : "home"},
  {path : "products" ,canActivate : [authGuard], component : ProductsComponent , title : "products"},
  {path : "brands" ,canActivate : [authGuard], component : BrandsComponent , title : "brands"},
  {path : "categories" ,canActivate : [authGuard], component : CategoriesComponent , title : "categories"},
  {path : "productDetails/:id" ,canActivate : [authGuard], component : ProductDetailsComponent , title : "productDetails"},
  {path : "specificBrand/:id" ,canActivate : [authGuard], component : SpecificBrandComponent , title : "specificBrand"},

  {path : "subCategories/:id" ,canActivate : [authGuard], component : SubcategoriesComponent , title : "subCategories"},

  { path: 'cart' ,canActivate : [authGuard] , loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'wishlist', canActivate : [authGuard], loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule) },

  {path : "allorders" , canActivate : [authGuard], component : AllordersComponent},
  {path : "cashOrder" , canActivate : [authGuard], component : OrderCashComponent},

  {path : "signUp" ,canActivate : [authDeActivatedGuard], component : SignUpComponent , title : "signUp" },
  {path : "login" ,canActivate : [authDeActivatedGuard], component : SignInComponent , title : "signIn"},
  {path : "forgetPassword" , canActivate : [authDeActivatedGuard] , component : ForgetPasswordComponent , title : "forget-password"},
  {path : "verifyCode" , canActivate : [authDeActivatedGuard] , component : VerifyCodeComponent , title : "verify-code"},
  {path : "resetPassword" , canActivate : [authDeActivatedGuard] , component : ResetPasswordComponent , title : "reset-password"},


  {path : "**" , component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
