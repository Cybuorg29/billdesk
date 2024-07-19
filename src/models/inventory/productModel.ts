import { Itax } from "../tax/Model"

interface spec {
    type: string
    value: string
}
export interface createProductObj {
    name: string
    tax: [],
    description: string
    code: string
    image: any
    rate: number
    unit: number
    category: 'Raw material' | 'Finished Goods'
    limit: number
    stock: number
    specifications: spec[]
    weight: number
}

export interface ProductObj {
    name: string
    tax: [],
    description: string
    code: string
    image: string
    rate: number
    category: string
    limit: number
    stock: number
    unit: string
    weight: number
    specifications: spec[]
    __v: number
    createdAt: any
    updatedAt: any
    _id: string

}


export interface productArray {
    products: ProductObj[]
    isProducts: boolean
}


export interface IInvoiceProduct {
    name: string
    tax: Itax[],
    description: string
    code: string
    qty: number
    rate: number
    unit: number
    discount: number
    total: number
    amount: number
    taxable_Value: number
    delivered?: number
}