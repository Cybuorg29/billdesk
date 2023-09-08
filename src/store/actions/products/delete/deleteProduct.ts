import { toast } from "react-toastify"
import { store } from "../../../app/store"
import { delProduct } from "../../../../api/inventory";
import { responceObj } from "../../../../models/responce";
import { actionPayload } from "../../../payload/payloadModel";
import { setProducts } from "../../../features/inventory/inventorySlice";
import { change } from "../../../features/loader/loaderSlice";




export async function deleteProduct(_id:string) {

    try{
         store.dispatch(change());
        
        const {auth} = store.getState();
          const {token } =auth
         const {data} =  await delProduct(token,_id)
           const res:responceObj = data;
            {(res.code===200)?Sucess(_id):error(res.error,res.message)}
    }catch(err:any){
        console.log(err)
        toast.error('an error has occured please try again ')
        store.dispatch(change());

    }
    
}


async function Sucess(_id:string) {

    const payload:actionPayload = {
        data:_id,
        type:'delete'
    }
    store.dispatch(setProducts(payload))
    store.dispatch(change());
   toast.info('product deleted sucessfully')
     
}


function error(error:string,message:string){
    console.log(error);toast.error(message)
}
