import { IInvoiceProduct } from "../../../models/inventory/productModel"

export interface ICreateCreditNote {
    note_No: string
    against_Invoice_Id: string
    against_Invoice_No: string
    from: {
        name: string
        gstin: string
        phone: string
        adress: string
        gmail: string
        state: string
    }
    to: {
        name: string
        gstin: string
        phone: string
        adress: string
        gmail: string
        state: string

    }
    products: IInvoiceProduct[]
    total: number
    bank: any
    token?: string
    id: string
    place_Of_Supply: string
    so_id: string
    vehical_No: string
}


export interface ICreditNote {
    note_No: string
    against_Invoice_Id: string
    against_Invoice_No: string
    from: {
        name: string
        gstin: string
        phone: string
        adress: string
        gmail: string
        state: string
    }
    to: {
        name: string
        gstin: string
        phone: string
        adress: string
        gmail: string
        state: string
    }
    products: IInvoiceProduct[]
    total: number
    bank: any
    _id: string
    createdAt: string
    updatedAt: string
    id: string
    place_Of_Supply: string
    vehical_No: string
}

