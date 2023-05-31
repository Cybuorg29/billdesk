
export interface registerArg {
    name :String ;
    gstin :String ;
    phone :String ;
    email :String ;
    building :String ;
    landmark :String ;
    district :String ;
    pincode :String ;
    state :String ;
    activities :String ;
    username :String ;
    password :String ;
    adress :String ;
    inNo :Number ;
}

export interface loginArg{
    username:string,
    password:string
    
}


  
 export interface userModel{
    adress:string
    building:string
    cid:any[]
    createdAt:string
    email:string
    gstin:string
    inNo?:number
    landmark:string
    name:string
    password:string
    phone:string
    pincode:string
    state:string
    token:string
    updatedAt:string
    username:string
    __v:number
    _id:string
 }
