export interface userDetailSchema{
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
    image:any,
    _id:string
}

export interface bankDetails{
    name:string
    isfc:string
    no:string
    branch:string
    bank:string
}

 export interface createUserModel{
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
    image:any,
     type:0|1
 }