import { actionPayload } from './../../payload/payloadModel';
import { IinvoiceStore } from "../../features/invoice/invoiceSlice";
import { PayloadAction } from '@reduxjs/toolkit';

export const invoiceActions={
    set:'set',
    delete:'delete'
}

export const setInovicesReducer=(state:IinvoiceStore,action:PayloadAction<actionPayload>)=>{
    
    const type = action.payload.type;
    const data = action.payload.data;
    switch(type){
        case invoiceActions.set:
            state.invoices = data;
            state.isLoaded = true
        break;
        
    }

    
}