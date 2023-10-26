import { PayloadAction } from "@reduxjs/toolkit";
import { ConnectionModel, connectionSchema } from "../../../models/Client/Connection/ConnectionsModel"
import { actionPayload } from "../../payload/payloadModel"



 export const ConnectionsActionObj={
    delete:'delete',
    addClient:'addClient',
     addSupplier:'addSupplier',
    set:'set',
}

export  const changeConnection=(state:ConnectionModel,action:PayloadAction<actionPayload>)=>{
     const  type = action.payload.type;
      const data = action.payload.data;

       switch (type) {
            case ConnectionsActionObj.set:
                state.isConnection = true
                state.connections = data;
                break;
                case ConnectionsActionObj.addSupplier:
                   const newArray  = [...state.connections.supplier,data];
                   state.connections.supplier = newArray;
                break
                case ConnectionsActionObj.addClient:
                    const newArra  = [...state.connections.client,data];
                    state.connections.client = newArra;
                 break
                case ConnectionsActionObj.delete:
                      const array:any = []
                      
                       state.connections.client.map((index:any)=>{
                           if(index?._id){

                           }else{
                            array.push(index);
                           }
                       })
                       state.connections = array;

                      break;
        default:
            break;
       }
       
}