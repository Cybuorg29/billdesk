
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


export interface addUserModelInterface{
    name:string,
    gstin:string,
    phone:string,
    email:string,
    building:string,
    landmark:string,
    district:string,
    pincode:string,
    state:string,
    activities:string,
    adress:string,
    transport:string,
    term:any[]
}

export interface storeUserInterface{
    name:string
    gstin:string
    email:string
    adress:string
    activities:string
    phone:string
    products:any[]

}