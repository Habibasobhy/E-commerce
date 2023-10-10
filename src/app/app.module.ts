import { SearchPipePipe } from './Shared/pipes/searchPipe/search-pipe.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorInterceptor } from './core/Interceptors/http-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SliderWrapperComponent } from './slider-wrapper/slider-wrapper.component';
import { TrimPipe } from './Shared/pipes/trimPipe/trim.pipe';
import { LoaderComponent } from './loader/loader.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesSliderComponent } from './categories-slider/categories-slider.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { OrderCashComponent } from './order-cash/order-cash.component';
import { SpecificBrandComponent } from './specific-brand/specific-brand.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CategoriesComponent,
    SignUpComponent,
    SignInComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    AllordersComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
    NavbarComponent,
    FeaturedProductsComponent,
    MainSliderComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    SliderWrapperComponent,
    VerifyCodeComponent,
    TrimPipe,
    SearchPipePipe,
    LoaderComponent,
    BrandsComponent,
    CategoriesSliderComponent,
    SubcategoriesComponent,
    OrderCashComponent,
    SpecificBrandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpInterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }