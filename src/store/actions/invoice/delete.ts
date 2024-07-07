import { toast } from "react-toastify";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { DeleteInvoiceApi } from "../../../api/v2/invoice";
import { responceObj } from "../../../models/responce";
import { Iinvoice } from "../../../models/invoice/invoice.model";
import { actionPayload } from "../../payload/payloadModel";
import { invoiceActions } from "../../reducers/invoice/invoice.reducer";
import { setInovices } from "../../features/invoice/invoiceSlice";

export async function  deleteInvoiceAction(_id:string) {
    try{

          store.dispatch(change())
          const {token, istoken} = store.getState().auth;
           const {data} = await DeleteInvoiceApi(_id,token);
           const res:responceObj = data;
           if(res.code!=200) throw new Error(res.error);
            const {invoices} = store.getState().invoice;
            let newArray:Iinvoice[] = [];
            invoices.map((index:Iinvoice)=>{
                if(index._id===_id) {}
                else newArray.push(index)
            })

            const payload:actionPayload={
                data:newArray,
                type:invoiceActions.set
            }

            store.dispatch(setInovices(payload));
            store.dispatch(change())
            toast.success('invoice Deleted sucessfully')

          
        }catch(err:any){
            console.error(err.message);
            toast.error('an error occured please try again')
            store.dispatch(change())
    }
    
}