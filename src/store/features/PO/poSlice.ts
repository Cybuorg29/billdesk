import { createSlice } from "@reduxjs/toolkit";
import { ICREATE_PURCHASE_ORDER, IPURCHASE_ORDER, IPurchaseOrderBody } from "../../../pages/purchaseOrder/model/model";
import { changePoReducer } from "../../reducers/Po/poReducer";




export interface Po {
    purchase_Order: IPURCHASE_ORDER[],
    isLoaded: boolean
}

const initialState: Po = {
    purchase_Order: [],
    isLoaded: false
}


const poSlice = createSlice({
    name: 'purchaseOrder',
    initialState: initialState,
    reducers: {
        setPoReducer: changePoReducer

    }
})

export const { setPoReducer } = poSlice.actions;

export default poSlice.reducer;
