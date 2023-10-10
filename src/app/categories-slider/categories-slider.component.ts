import { Component } from '@angular/core';
import { ProductsService } from '../Shared/Services/products-service/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../Shared/Interfaces/category';
import { CategoriesService } from '../Shared/Services/categories-service/categories.service';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.css']
})
export class CategoriesSliderComponent {
  allCategories: Category[] = [];

  //& Owl Carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      768: {
        items: 6
      },
      992: {
        items: 8
      }
    },
    nav: true
  }

  constructor(private _categoriesService : CategoriesService){

  }

  ngOnInit(): void {
      this.getCategories();
  }

  getCategories(){
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        

        this.allCategories = res.data;
        console.log(this.allCategories);
      }
    })
  }
}

