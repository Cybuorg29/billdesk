import { PayloadAction } from "@reduxjs/toolkit";
import { ProductObj, productArray } from "../../../models/inventory/productModel";
import { actionPayload } from "../../payload/payloadModel";


const operations={
    set:"set",
    delete:"delete",
     push:"push"
}

interface array {
    product:ProductObj[]
}

export const changeProduct=(state:productArray,action:PayloadAction<actionPayload>)=>{
    const data = action.payload.data;
    const type = action.payload.type;
     switch (type) {
        case operations.set:
            state.products = data
             state.isProducts = true
            break;
            case operations.delete:
                  state.products.filter((index:ProductObj)=>index._id!==data);
            break;
            case operations.push :
              state.products.push(data)
              break
        default:
            break;
     }

}