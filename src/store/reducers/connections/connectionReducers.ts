import { PayloadAction } from "@reduxjs/toolkit";
import { ConnectionModel, connectionSchema } from "../../../models/Client/Connection/ConnectionsModel"
import { actionPayload } from "../../payload/payloadModel"



 export const ConnectionsActionObj={
    delete:'delete',
    add:'add',
    set:'set',
}

export  const changeConnection=(state:ConnectionModel,action:PayloadAction<actionPayload>)=>{
     const  type = action.payload.type;
      const data = action.payload.data;

       switch (type) {
            case ConnectionsActionObj.set:
                state.connections = data;
                break;
                case ConnectionsActionObj.add:
                   const newArray  = [...state.connections,data];
                   state.connections = newArray;
                break
                case ConnectionsActionObj.delete:
                      const array:any = []
                      
                       state.connections.map((index:any)=>{
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