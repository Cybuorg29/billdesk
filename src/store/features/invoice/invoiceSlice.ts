import { createSlice } from "@reduxjs/toolkit"
import { IcreateInvoice, Iinvoice } from "../../../models/invoice/invoice.model"
import { setInovicesReducer } from "../../reducers/invoice/invoice.reducer"


export interface IinvoiceStore {
    isLoaded:boolean
    invoices:Iinvoice[]
}

const inititalState:IinvoiceStore={
    isLoaded:false,
    invoices:[]
}

const invoiceSlice = createSlice({
    name:'invoices',
    initialState:inititalState,
    reducers:{
       setInovices:setInovicesReducer
    }
})


export const {setInovices} = invoiceSlice.actions

export default invoiceSlice.reducer ;
