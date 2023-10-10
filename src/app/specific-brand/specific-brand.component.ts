import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands/brands.service';
import { Brands } from '../brands/brands';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-brand',
  templateUrl: './specific-brand.component.html',
  styleUrls: ['./specific-brand.component.css']
})
export class SpecificBrandComponent implements OnInit{

  brandId : string = "";
  specificBrandData : Brands = {} as Brands;

  constructor(private _brandsService : BrandsService , private _activatedRoute : ActivatedRoute){}

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe((res:any)=>{

      this.brandId=res.params.id;
    })

    this.getSpecificBrand(this.brandId);
      
  }

  getSpecificBrand(id:string){
    this._brandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        console.log(res);
        this.specificBrandData=res.data
        
      }
    })
  }

}
