import { toast } from "react-toastify"
import { store } from "../../app/store";
import { getTermsApi } from "../../../api/v2/terms/terms.api";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { set } from "../../features/terms";
import { termActions } from "../../reducers/term/term.reducer";

export async function  getTerms() {
    try{
 
         const {istoken,token} = store.getState().auth;
         if(!istoken) throw new Error('Waiting for login');
          const {data} = await getTermsApi(token);
          const res:responceObj = data;
          console.dir(res);
           (res.code===200)? sucess(res):toast.error(res?.message)      
    }catch(err:any){
        console.log(err.message,err?.error)
         toast.error(err.message);
    }
        
}

function sucess(res:responceObj){
   if(res.code===200){

       const payload:actionPayload={
           type:termActions.set,
           data:res.package
        }
        store.dispatch(set(payload));
    }

}