import { PayloadAction } from "@reduxjs/toolkit";
import { IBillsStore } from "../../../features/bills/receivable/billsReceivableSlice";
import { actionPayload } from "../../../payload/payloadModel";



export const payableActions = {
    SET: 'SET',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    PUSH: 'PUSH'
}

export const setPayables = (state: IBillsStore, action: PayloadAction<actionPayload>) => {

    const type = action.payload.type;
    const data = action.payload.data;

    switch (type) {
        case payableActions.SET:
            state.invoice = data
            state.isLoaded = true
            break;
        case payableActions.DELETE:
            const newArray = state.invoice.filter(index => index._id !== data);
            state.invoice = newArray;
            break;

    }

}