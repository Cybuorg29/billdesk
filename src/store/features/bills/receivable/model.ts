import { IInvoiceProduct } from "../../../../models/inventory/productModel"

export interface IbillsPaylable {
    _id: string,
    id: string,
    billed_From: {
        name: string,
        gstin: string,
        adress: string,
        id: string,
        state: string
    },
    products: IInvoiceProduct[],
    po: string
    total: number
    isPaid: boolean
    createdAt: any
    updatedAt: any

}

export interface IcreateBillsPayable {
    token: string,
    billed_From: {
        name: string,
        gstin: string,
        adress: string,
        id: string,
        state: string
    },
    products: IInvoiceProduct[],
    po: {
        number: string
        id: string
    }
    total: number
    isPaid: boolean
}