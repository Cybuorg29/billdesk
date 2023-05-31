export  interface invoiceModel{
    bid:string,
    sid:string,
     reverseCharge:boolean,
     date:string,
     inNo:string,
     state:string,
     scode:number,
     transport:string,
    total:number,
    id:string,
    bname:string,
    status:boolean,
    createdAt:string,
    updatedAt:string,
    __v:number,
    _id:string,
     vehicalNo:string,
     products:any[]
}

export interface invocieCreationDetails{
    inNo:string
    date:string
    reverceCharge:boolean
    state:string
    transport:string
    vehicalNo:string
    gstin:string
}