export interface Product {
    imageCover : string,
    price:number,
    ratingsAverage:number,
    category : Category,
    title : string,
    id : string,
    description? : string,
    images? : string[]
}

interface Category{
    name: string
}
