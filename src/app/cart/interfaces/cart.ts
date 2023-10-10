export interface Cart {
    numOfCartItems : number,
    data : Data
}

interface Data {
    totalCartPrice : number,
    _id : string ,
    products : Product[]
}

interface Product {
    count : number,
    price : number,
    product : innerProduct
}

interface innerProduct{
    imageCover : string,
    quantity : number,
    title : string,
    category : Category,
    id : string
}


interface Category{
    name : string
}
