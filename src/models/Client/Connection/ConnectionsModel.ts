import { clientModelObj } from "../ClientModel"



 export interface connectionSchema{
    sid:String
    cid:String
    status:boolean
    type:0|1
}

export interface  ConnectionModel  {
   isConnection:boolean
   connections: {
      client :any[]
      supplier:any[]
   }

} 