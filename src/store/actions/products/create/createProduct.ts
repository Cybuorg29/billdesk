import { toast } from "react-toastify";
import { createProductObj } from "../../../../models/inventory/productModel";
import { store } from "../../../app/store";
import { change } from "../../../features/loader/loaderSlice";
import { pushProduct } from "../../../../api/inventory";
import { responceObj } from "../../../../models/responce";
import { actionPayload } from "../../../payload/payloadModel";
import { setProducts } from "../../../features/inventory/inventorySlice";


export const createProduct = async(product:createProductObj)=>{

    try{
        
         store.dispatch(change());
          const {auth} =  store.getState()
           const {token} = auth;
            const {data} = await pushProduct(token,product);
             const res:responceObj = data;
               if(res.code!=200){
                toast.error(res.message)
                 store.dispatch(change())
               }else if(res.code===200) {
                 const payload:actionPayload={
                    type:'push',
                    data:res.package
                 }
                  store.dispatch(setProducts(payload));
                  toast.success('product added sucessfully')
                  //  window.location.pathname = '/dashboard/inventory'
                  store.dispatch(change())
               }

    }catch(err:any){
        console.log(err.message)
         toast.error('an error occured please try again ');
          store.dispatch(change())
    }

}