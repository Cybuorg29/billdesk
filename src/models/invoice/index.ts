import { ProductObj } from "../inventory/productModel"

export interface IcreateInvoice{
   shipped_To:{
    name:string
    adress:string
    state:string
    state_Code:number
    gstin:string
   },
    billed_To:{
    name:string
    adress:string
    state:string
    state_Code:number
    gstin:string
   },
   billed_From:{
    name:string
    adress:string
    mobile:string
    state:string
    state_Code:number
    gstin:string
   }
   invoice_Date:string
   invoice_No:string
   reverce_Charge:boolean
   state:string
   transport_Mode:string
   vehical_No:string
   date_of_supply:string
   place_of_supply:string
   products:ProductObj[]
    Grand_total:number
   total_Tax:number
   discount:number
   gst_On_Reverce_Charge:number
   

}


export interface Iinvoice{
    shipped_To:{
     name:string
     adress:string
     state:string
     s_Code:number
     gstin:string
    },
     billed_To:{
     name:string
     adress:string
     state:string
     s_Code:number
     gstin:string
    },
    billed_From:{
     name:string
     adress:string
     mobile:string
     state:string
     s_Code:number
     gstin:string
    }
    invoice_Date:string
    invoice_No:string
    reverce_Charge:boolean
    state:string
    transport_Mode:string
    vehical_No:string
    date_of_supply:string
    place_of_supply:string
    products:ProductObj[]
     Grand_total:string
    total_Tax:number
    discount:number
    gst_On_Reverce_Charge:string
    
 
 }