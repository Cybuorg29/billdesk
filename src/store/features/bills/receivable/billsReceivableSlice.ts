import { createSlice } from "@reduxjs/toolkit"
import { IbillsPaylable } from "./model"
import { setPayables } from "../../../reducers/bills/receivable/reducer"

export interface IBillsStore {
    isLoaded: boolean
    invoice: IbillsPaylable[]
}



const initialState: IBillsStore = {
    isLoaded: false,
    invoice: []
}

const payableSlice = createSlice({
    name: 'payables',
    initialState: initialState,
    reducers: { changePayables: setPayables }
})

export const { changePayables } = payableSlice.actions;

export default payableSlice.reducer 
