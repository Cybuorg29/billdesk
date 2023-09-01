import { clientModelObj } from "../ClientModel"



interface connectionSchema{
    sid:String
    cid:String
    status:'approved'|'Pending'
}

export interface  ConnectionModel  {
   isConnection:boolean
   connections:connectionSchema[]
    suppliers:connectionSchema[]
     clients:clientModelObj[]  
}