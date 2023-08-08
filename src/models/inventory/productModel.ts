export interface createProductObj{
    name:string
    tax:[],
    description:string
    code:string
    image:any
    rate:number
    category: 'Raw material'  | 'Finished Goods' 
    limit:number
    stock:number
}

export interface ProductObj{
    name:string
    tax:[],
    description:string
    code:string
    image:any
    rate:number
    category:string
    limit:number
    stock:number
    __v:number
    createdAt:any
    updatedAt:any
    _id:string
}


export interface productArray {
    products:ProductObj[]
    isProducts:boolean
}

