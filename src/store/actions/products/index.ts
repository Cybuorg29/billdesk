import { toast } from "react-toastify";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { getProductsByToken } from "../../../api/inventory";
import { actionPayload } from "../../payload/payloadModel";
import { responceObj } from "../../../models/responce";
import {  setProducts } from "../../features/inventory/inventorySlice";



export const getProducts=async()=>{
    try{
        
        store.dispatch(change()); 
         const {auth,product} = store.getState()
         const {token,istoken} = auth
          const {isProducts} = product 
          
         if(!istoken||isProducts){
            store.dispatch(change())
         }else{

         const {data} = await  getProductsByToken(token);
          const res:responceObj = data;
          console.log(res)
        
         if(res.code===500||res.code===400){
            throw new Error(data?.error)
         }else if(res.code===200){
            const payload:actionPayload={
                type:'set',
                data:res.package?.products
            }
            store.dispatch(setProducts(payload));
             store.dispatch(change())

         }
        }
        


    }catch(err:any){
        console.log(err.message);
         toast.error('an error occured please try again ')
         store.dispatch(change())
    }
}