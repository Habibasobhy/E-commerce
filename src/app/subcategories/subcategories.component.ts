import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../Shared/Services/categories-service/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../Shared/Interfaces/category';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {

  categoryId : string = '';
  subCategoryData : Category[] = [];

  constructor(private _categoriesService : CategoriesService,
    private _activatedRoute : ActivatedRoute){
  }

  ngOnInit(): void {
  
    this.getParamId();
  }


  getParamId(){
    this._activatedRoute.paramMap.subscribe((res:any) => {
      console.log(res.params.id);

      this.categoryId = res.params.id;

      // send id parameter to getSubcategories method to send this id to api
      this.getSubcategories(this.categoryId);
    })
  }


    // method to get subCategories 
    getSubcategories(id : string) {
      this._categoriesService.getSubCategories(id).subscribe({
        next : (res) => {
          console.log(res.data);
          this.subCategoryData = res.data
        }
      })
    }
}
