import { ProductObj } from "../../../models/inventory/productModel";
import { payloadAction } from '../../payload/payloadModel';


const operations={
    set:"set",
    delete:"delete",
     push:"push"
}

export const setProducts=(state:ProductObj[],action:payloadAction)=>{
    const data = action.data;
    const type = action.type;
     switch (action.type) {
        case operations.set:
            state = data
            break;
            case operations.delete:
                  state.filter((index:ProductObj)=>index._id!==data);
            break;
            case operations.push :
              state.push(data)
              break
        default:
            break;
     }

}