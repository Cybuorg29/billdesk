import { toast } from "react-toastify";
import { store } from "../../app/store";
import { getInvoiceApi } from "../../../api/v2/invoice";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { invoiceActions } from "../../reducers/invoice/invoice.reducer";
import { setInovices } from "../../features/invoice/invoiceSlice";

export async function setInvoiceAction() {
    try{
        const {istoken,token} =  store.getState().auth;
         if(!istoken) {}
         else{
             const {data} = await getInvoiceApi(token)
              const res:responceObj = data;
              if(res.code!=200) throw new Error(res.error);
              sucess(res);
        }
    }catch(err :any){
        console.log(err?.message);
        toast.error('an error occured please try again');
    }
    
}

function sucess(res:responceObj){
    if(res.code===200){
        const payload:actionPayload={
            data:res.package,
            type:invoiceActions.set
        }
        store.dispatch(setInovices(payload))
    }
}