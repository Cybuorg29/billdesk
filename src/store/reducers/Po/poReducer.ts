import { PayloadAction } from "@reduxjs/toolkit";
import removeIndexFromArray from "../../../pages/purchaseOrder/Create/functions/removeIndex";
import removeIndex from "../../../utils/removeIndex";
import { Po } from "../../features/PO/poSlice";
import { actionPayload } from "../../payload/payloadModel";
import { store } from "../../app/store";
import { ICREATE_PURCHASE_ORDER, IPURCHASE_ORDER } from "../../../pages/purchaseOrder/model/model";
import { setPayablePaidAction } from "../../actions/bills/payable/setPaid";
import { setPayablesAction } from "../../actions/bills/payable";
import { IbillsPaylable } from "../../features/bills/receivable/model";
import { toast } from "react-toastify";



export const poAction = {
    set: 'set',
    push: 'push',
    delete: 'delete'
}

function initliseWithBillsPayables(array: IPURCHASE_ORDER[], invoice: IbillsPaylable[]): IPURCHASE_ORDER[] {

    array.map((index) => {
        return invoice.map((invoice) => {
            if (index._id === invoice.po) {
                index.bills.push(invoice);
            }
        })
    })


    return array;


}


export const changePoReducer = (state: Po, action: PayloadAction<actionPayload>) => {
    try {

        const data: any = action.payload.data;
        const type: any = action.payload.type;

        switch (type) {
            case poAction.set:
                const toPush = initliseWithBillsPayables(data.array, data.invoice);
                state.purchase_Order.push(...toPush)
                state.isLoaded = true
                break;
            case poAction.push:
                state.purchase_Order = [...state.purchase_Order, data];
                break;
            case poAction.delete:
                state.purchase_Order = removeIndex(state.purchase_Order, data);
                break;
            default:
                break;
        }
    } catch (err: any) {
        toast.error(err.message);

    }


}