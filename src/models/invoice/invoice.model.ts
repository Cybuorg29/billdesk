import { bankInterface } from "../../store/features/bank/bankSlice"
import { IInvoiceProduct, ProductObj } from "../inventory/productModel"

export interface IcreateInvoice {
   shipped_To: {
      name: string
      adress: string
      state: string
      state_Code: number
      gstin: string
   },
   billed_To: {
      name: string
      adress: string
      state: string
      state_Code: number
      gstin: string
   },
   billed_From: {
      name: string
      adress: string
      mobile: string
      state: string
      state_Code: number
      gstin: string
   }
   invoice_Date: string
   invoice_No: string
   reverce_Charge: boolean
   state: string
   transport_Mode: string
   vehical_No: string
   date_of_supply: string
   place_of_supply: string
   products: IInvoiceProduct[]
   grand_Total: number
   total_Tax: number
   discount: number
   gst_On_Reverce_Charge: number
   state_Code: number
   terms_And_Conditions: [],
   bank: bankInterface,
   id: string,
   isPaid: boolean
   Eway_No: string
   SO_NO: string
   challan_no?: string
   SO_Id?: string
}


export interface Iinvoice {
   shipped_To: {
      name: string
      adress: string
      state: string
      state_Code: number
      gstin: string
   },
   billed_To: {
      name: string
      adress: string
      state: string
      state_Code: number
      gstin: string
   },
   billed_From: {
      name: string
      adress: string
      mobile: string
      state: string
      state_Code: number
      gstin: string
   }
   invoice_Date: string
   invoice_No: string
   reverce_Charge: boolean
   state: string
   transport_Mode: string
   vehical_No: string
   date_of_supply: string
   place_of_supply: string
   products: IInvoiceProduct[]
   grand_Total: number
   total_Tax: number
   discount: number
   gst_On_Reverce_Charge: number
   state_Code: number
   terms_And_Conditions: [],
   bank: bankInterface,
   id: string
   _id: string
   _v: number
   isPaid: boolean
   createdAt: string
   updatedAt: string
   Eway_No: string
   SO_NO: string
   challan_no?: string
   SO_Id?: string

}