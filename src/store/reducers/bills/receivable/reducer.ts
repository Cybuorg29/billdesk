import { PayloadAction } from "@reduxjs/toolkit";
import { IBillsStore } from "../../../features/bills/receivable/billsReceivableSlice";
import { actionPayload } from "../../../payload/payloadModel";
import { IbillsPaylable } from "../../../features/bills/receivable/model";



export const payableActions = {
    SET: 'SET',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    PUSH: 'PUSH',
    MARK_PAID: 'MARKPAID'
}

export const setPayables = (state: IBillsStore, action: PayloadAction<actionPayload>) => {

    const type = action.payload.type;
    const data = action.payload.data;

    switch (type) {
        case payableActions.SET:
            state.invoice = data
            state.isLoaded = true
            break;
        case payableActions.PUSH:
            state.invoice = [...state.invoice, data];
            break;

        case payableActions.DELETE:
            {
                const newArray = state.invoice.filter(index => index._id !== data);
                state.invoice = newArray;
                break;
            }

        case payableActions.MARK_PAID:
            const newArray = state.invoice.map((index: IbillsPaylable) => {
                if (index._id === data) {
                    index.isPaid = true
                    return index
                }
                return index;
            })
            state.invoice = newArray;


    }

}