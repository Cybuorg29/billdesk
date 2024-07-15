import { toast } from "react-toastify";
import { IcreateInvoice } from "../../../models/invoice/invoice.model";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { createInvoiceAPI } from "../../../api/v2/invoice";
import { responceObj } from "../../../models/responce";
import { setInvoiceAction } from "./set";
import { actionPayload } from "../../payload/payloadModel";
import { SalesOrderActions, salesOrderPayloadTypes } from "../../reducers/salesOrders/reducer";
import { IInvoiceProduct } from "../../../models/inventory/productModel";
import { setSalesOrderReducer } from "../../features/salesOrders/SalesOrderSlice";
import { updateDeliveredThroughInvoice } from "../salesOrders/action";

export async function createInvoice(obj: IcreateInvoice) {
  try {

    store.dispatch(change());
    const { istoken } = store.getState().auth
    if (!istoken) throw new Error('an error please refresh and try again');
    const { data } = await createInvoiceAPI(obj);
    const res: responceObj = data;
    if (res.code !== 200) throw Error(res.error)
    toast.success(res.message);
    updateDeliveredThroughInvoice(obj);
    setInvoiceAction();
    store.dispatch(change());
  } catch (err: any) {
    toast.error(err?.error);
    toast.error(err?.message);
    console.log(err?.error, err?.message);
    store.dispatch(change());
  }

}