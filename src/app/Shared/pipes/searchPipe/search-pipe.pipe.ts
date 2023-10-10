import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../Interfaces/product';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {


  // Product is interface 
  // this func wait products => array of obj == Product[] it is interface
  // and wait searchKey from input y3ny al user hyktbo
  
  transform(products: Product[], searchKey : string): Product[] {
    // hy loop 3la al Products.title w hy7wlo l lowercase w h4oof x al title al searchKey ally user hyktbo
    return products.filter((ele) => ele.title.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
