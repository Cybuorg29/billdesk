import { PayloadAction } from "@reduxjs/toolkit";
import { ConnectionModel } from "../../../models/Client/Connection/ConnectionsModel"
import { actionPayload } from "../../payload/payloadModel"



 export const ConnectionsActionObj={
    delete:'delete',
    add:'add',
    set:'set',
    connections:'connections'
}

export  const changeConnection=(state:ConnectionModel,action:PayloadAction<actionPayload>)=>{
     const  type = action.payload.type;
      const data = action.payload.data;

       switch (type) {
        case  ConnectionsActionObj.set:
             state.isConnection = true;
              state.clients = data?.clients;
               state.suppliers = data?.suppliers;
            break;
            case ConnectionsActionObj.connections:
                state.connections = data;
                break;
                case ConnectionsActionObj.add:
                    (data?.type==='supplier')?state.suppliers = [...state.suppliers,data.connection]:state.clients = [...state.clients,data?.connection];
                break
        default:
            break;
       }
       
}