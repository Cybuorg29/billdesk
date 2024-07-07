import { toast } from 'react-toastify';
import axios from "axios"
import { IcreateInvoice } from "../../../models/invoice/invoice.model"
import { v2Url } from "../../Url/ProdUrl"

export const createInvoiceAPI=(obj:IcreateInvoice)=>{
    const {  shipped_To,
        billed_To,
        billed_From,
        invoice_Date,
        invoice_No,
        reverce_Charge,
        state,
        transport_Mode,
        vehical_No,
        date_of_supply,
        place_of_supply,
        products,
        grand_Total,
        total_Tax,
        discount,
        gst_On_Reverce_Charge,
        state_Code,
        terms_And_Conditions,id,bank,isPaid} = obj
    return  toast.promise(axios.post(`${v2Url}/api/user/create/invoice`, {  shipped_To,
        billed_To,
        billed_From,
        invoice_Date,
        invoice_No,
        reverce_Charge,
        state,
        transport_Mode,
        vehical_No,
        date_of_supply,
        place_of_supply,
        products,
        grand_Total,
        total_Tax,
        discount,
        gst_On_Reverce_Charge,
        state_Code,
        terms_And_Conditions,id,bank,isPaid}),{pending:'saving invoice'})
}

export function getInvoiceApi(token:string){
    return toast.promise(axios.get(`${v2Url}/api/user/invoice/get/${token}`),{pending:'getting invoices'})
}

export function DeleteInvoiceApi(_id:string,token:string){
    return toast.promise(axios.get(`${v2Url}/api/user/invoice/delete/${_id}/${token}`),{pending:'please while we perform this action'})
}