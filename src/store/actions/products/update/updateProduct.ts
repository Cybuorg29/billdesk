import { toast } from "react-toastify";
import { updateProductApi } from "../../../../api/v2/product";
import { ProductObj } from "../../../../models/inventory/productModel";
import { responceObj } from "../../../../models/responce";
import { getProducts } from "..";
import { store } from "../../../app/store";
import { actionPayload } from "../../../payload/payloadModel";
import { setProducts } from "../../../features/inventory/inventorySlice";
import { change } from "../../../features/loader/loaderSlice";
import { ProductOperations } from "../../../reducers/inventory";

export async function updateProduct(dat: ProductObj) {
    try {
        store.dispatch(change())
        const { data } = await updateProductApi(dat);
         console.log('data',data)
        const res: responceObj = data;
         console.log('respoce',res)
        if (res.code !== 200) throw new Error(res.error);
        else {
               console.log('package',res.package)   
               const newArray:any =[];
               const {products} = store.getState().product;
             products.map((index)=>{
                if(index._id===res.package?._id){
                     console.log('product found')
                    newArray.push(dat);
                    return
                }else{
                    newArray.push(index)
                    return
                }
             })

              const payload:actionPayload={
                type:ProductOperations.set,
                data:newArray
              }
            store.dispatch(setProducts(payload));
            toast.success('product updated Sucessfully');
        store.dispatch(change())


        }


    } catch (err: any) {
        console.log(err?.message, err?.error);
        toast.error('an error occured please try again');
        store.dispatch(change())

    }
}