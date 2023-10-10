import { Component, OnInit } from '@angular/core';
import { BrandsService } from './brands.service';
import { Brands } from './brands';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  allBrands: Brands[] = [];
  specificBrand : Brands = {} as Brands;

  constructor(
    private _brandsService: BrandsService) {}

  ngOnInit(): void {
    this.getBrands();
  }


  getBrands() {
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);

        this.allBrands = res.data;
      },
    });
  }

  
  getSpecificBrand(id : string){
    this._brandsService.getSpecificBrand(id).subscribe({
      next : (res) => {
        console.log(res.data);

        this.specificBrand = res.data;
      }
    })
  }
}
