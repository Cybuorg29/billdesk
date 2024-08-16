import { IInvoiceProduct } from "../../../models/inventory/productModel"
import { IPURCHASE_ORDER_PRODUCT } from "../../../pages/purchaseOrder/model/model"

export interface ICreateDebitNote {

    note_No: string
    debit_Note_Date: string
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
    bank: {
        name: string
        bank: string
        ifsc: string
        ac_no: string
    }
    token?: string
    id: string
    place_Of_Supply: string
    po_id: string


}

export interface IDebitNote {

    note_No: string
    debit_Note_Date: string
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
    bank: {
        name: string
        bank: string
        ifsc: string
        ac_no: string
    }
    _id: string
    createdAt: string
    updatedAt: string
    id: string
    place_Of_Supply: string
    po_id: string


}
