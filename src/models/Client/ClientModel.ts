

export  interface createClientObj{
    name:string
    gstin:string
    phone:string
    email:string
    building:string
    city:string
    district:string
    state:string
    activities:string
    pincode:string
    type:0 | 1
}

export interface clientModelObj{
    __v:number
    createdAt:any
    updatedAt:any
    _id:string
    name:string
    gstin:string
    phone:string
    email:string
    building:string
    city:string
    district:string
    state:string
    activities:string
    pincode:string
    type: 1 |0
}