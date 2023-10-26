import { toast } from "react-toastify";
import { ITERMS } from "../../features/terms";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { createTermApi } from "../../../api/v2/terms/terms.api";
import { responceObj } from "../../../models/responce";
import { getTerms } from "./set";


export async function createTerm(obj:ITERMS){
    try{
         store.dispatch(change());
       const {istoken,token} = store.getState().auth
        if(!istoken) throw new Error('an error please try again');
        const {data} = await createTermApi(obj,token);
          const res:responceObj = data;
          if(res.code!=200)  throw new Error(res.error);
          toast.success('Added sucessfully');
           store.dispatch(change())
          getTerms(); 
                
    }catch(err:any){
        toast.error(err.message)
         console.log(err.message,err?.error);
         store.dispatch(change());
    }

}