import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Shared/Services/products-service/products.service';
import { Category } from '../Shared/Interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../Shared/Services/categories-service/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  allCategories: Category[] = [];

  constructor(private _categoriesService : CategoriesService){

  }

  ngOnInit(): void {
      this.getCategories();
  }

  // method to get Categories 
  getCategories(){
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        

        this.allCategories = res.data;
        console.log(this.allCategories);
      }
    })
  }
}
