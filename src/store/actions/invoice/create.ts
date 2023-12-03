import { toast } from "react-toastify";
import { IcreateInvoice } from "../../../models/invoice/invoice.model";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { createInvoiceAPI } from "../../../api/v2/invoice";
import { responceObj } from "../../../models/responce";
import { setInvoiceAction } from "./set";

export async function createInvoice(obj: IcreateInvoice) {
    try {

        store.dispatch(change());
        const {istoken} = store.getState().auth
        if(!istoken) throw new Error('an error please refresh and try again');
         const {data} = await createInvoiceAPI(obj);
          const res:responceObj = data;
          if(res.code===200) 
          {
            toast.success(res.message);
            setInvoiceAction();
          }
          else {
               throw Error(res.error)
          }

        store.dispatch(change());
    } catch (err: any) {
        toast.error('an error occured please try again');
         console.log(err?.error,err?.message);
          store.dispatch(change());
    }

}